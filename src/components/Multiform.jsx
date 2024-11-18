import { useState } from "react";
import axios from "../components/utils/axiosClient";
import { useGlobal } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";

export default function () {
    const { categories, tags, reFetchPosts } = useGlobal();
    const navigate = useNavigate();

    // Dati di default per un nuovo blog
    const initialData = {
        title: "",
        image: "",
        content: "",
        categoryId: "",
        tags: [],
        published: false,
    };

    // State per memorizzare i dati dell'articolo corrente in fase di creazione
    const [formData, setFormData] = useState(initialData);
    //State per memorizzare gli errori
    const [errors, setErrors] = useState({});

    const validateForm = (formData) => {
        const errors = {};

        // Validazione del titolo
        if (!formData.title.trim()) {
            errors.title = "Il titolo è obbligatorio.*";
        } else if (formData.title.length < 5) {
            errors.title = "Il titolo deve avere almeno 5 caratteri.";
        }

        // Validazione dell'immagine
        if (!formData.image.trim()) {
            errors.image = "L'immagine è obbligatoria.*";
        } else if (!/^https?:\/\/\S+\.\S+$/.test(formData.image)) {
            errors.image = "Il campo immagine deve essere un URL valido.";
        }

        // Validazione del contenuto
        if (!formData.content.trim()) {
            errors.content = "Il contenuto è obbligatorio.*";
        } else if (formData.content.length < 10) {
            errors.content = "Il contenuto deve avere almeno 10 caratteri.";
        }

        return errors;
    };

    //Funzione per gestire il submit del form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return; //Blocco invio
        }

        const url = `/posts`;

        try {
            const res = await axios.post(url, formData);
            // Resetto i campi input
            setFormData(initialData);
            setErrors({});
            reFetchPosts();

            navigate("/posts");
        } catch (error) {
            console.error("Errore durante la creazione del post:", error);
            console.error("Dettagli:", error.response?.data); // Eventuali dettagli dall'API
        }
    };

    // Funzione per aggiornare un campo specifico nel form dell'articolo
    const handleField = (key, newValue) => {
        setFormData((data) => ({ ...data, [key]: newValue }));
    };

    // Funzione per gestire l'aggiunta o rimozione di un tag nell'articolo
    const handleTagChange = (tag) => {
        setFormData((prevData) => {
            // Controllo se il tag è già presente
            const isTagSelected = prevData.tags.includes(tag);
            const newTags = isTagSelected
                ? prevData.tags.filter((t) => t !== tag) // Rimuovo il tag se era selezionato
                : [...prevData.tags, tag]; // Aggiungo il tag se non era selezionato

            return { ...prevData, tags: newTags };
        });
    };

    return (
        <>
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label
                            htmlFor="title"
                            className="block text-gray-700 font-medium"
                        >
                            Titolo Blog:
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Inserisci il titolo del blog"
                            value={formData.title}
                            className={`w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-${
                                errors.title ? "red" : "green"
                            }-500`}
                            onChange={(e) =>
                                handleField("title", e.target.value)
                            }
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="image"
                            className="block text-gray-700 font-medium"
                        >
                            URL Immagine:{" "}
                        </label>
                        <input
                            type="text"
                            name="image"
                            id="image"
                            placeholder="Inserisci l'URL dell'immagine"
                            value={formData.image}
                            className={`w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-${
                                errors.image ? "red" : "green"
                            }-500`}
                            onChange={(e) =>
                                handleField("image", e.target.value)
                            }
                        />
                        {errors.image && (
                            <p className="text-red-500 text-sm">
                                {errors.image}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="content"
                            className="block text-gray-700 font-medium"
                        >
                            Descrizione:{" "}
                        </label>
                        <textarea
                            id="content"
                            value={formData.content}
                            rows="6"
                            placeholder="Inserisci una descrizione per il Blog..."
                            onChange={(e) =>
                                handleField("content", e.target.value)
                            }
                            className={`w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-${
                                errors.content ? "red" : "green"
                            }-500`}
                        />
                        {errors.content && (
                            <p className="text-red-500 text-sm">
                                {errors.content}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="category"
                            className="block text-gray-700 font-medium"
                        >
                            Categoria:{" "}
                        </label>
                        <select
                            name="category"
                            id="category"
                            value={formData.categoryId}
                            onChange={(e) =>
                                handleField(
                                    "categoryId",
                                    Number(e.target.value)
                                )
                            }
                            className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="" disabled>
                                Seleziona una categoria
                            </option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">
                            Tags:{" "}
                        </label>
                        <div className="space-y-1">
                            {tags.map((tag) => (
                                <div
                                    key={tag.id}
                                    className="flex items-center space-x-2"
                                >
                                    <input
                                        type="checkbox"
                                        id={tag.id}
                                        checked={formData.tags.includes(tag.id)}
                                        onChange={() => handleTagChange(tag.id)}
                                        className="h-4 w-4 text-green-500 border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor={tag.id}
                                        className="text-gray-600"
                                    >
                                        {tag.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <label
                            htmlFor="published"
                            className="text-gray-700 font-medium"
                        >
                            Pubblica:
                        </label>
                        <input
                            type="checkbox"
                            id="published"
                            checked={formData.published}
                            onChange={(e) =>
                                handleField("published", e.target.checked)
                            }
                            className="h-4 w-4 text-green-500 border-gray-300 rounded"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full py-3 bg-[#cfef00] text-black font-semibold rounded-lg hover:bg-[#c4e201] focus:outline-none focus:ring-2 focus:ring-[#b52c0a]"
                        >
                            Aggiungi
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
