import axios from "../components/utils/axiosClient";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RiArrowGoBackLine as TornaIndietro } from "react-icons/ri";

export default function SinglePost() {
    // Recupero lo slug come parametro
    const { slug } = useParams();

    // State per il singolo post (inizializzato come oggetto vuoto)
    const [post, setPost] = useState({});
    // State per il loading
    const [loading, setLoading] = useState(true);
    // State per l'errore
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Fetch per recuperare il singolo post
    const fetchPost = async () => {
        try {
            // Simulazione di ritardo di caricamento per vedere il loader
            await new Promise((resolve) => setTimeout(resolve, 500));

            const { data } = await axios.get(`/posts/${slug}`);
            setPost(data);
        } catch (error) {
            setError("Errore nel recupero del post");
            console.error("Error fetching single post:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [slug]);

    return (
        <main>
            {loading ? (
                <div className="flex justify-center items-center h-screen gap-3">
                    <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-[#b52c0a]"></div>
                    <div className="text-xl">Loading...</div>
                </div>
            ) : error ? (
                <h1>{error}</h1>
            ) : Object.keys(post).length === 0 ? (
                <h1>Post non trovato</h1>
            ) : (
                <div className="p-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1 text-lg my-button text-black mb-10"
                    >
                        <TornaIndietro className="text-3xl" /> Torna Indietro
                    </button>
                    <div className="px-5">
                        <h1 className="text-3xl">{post.title}</h1>
                        <div className="border-b-2">
                            <img
                                src={
                                    post.image ||
                                    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                                }
                                alt={post.title}
                                className="w-[600px] rounded-xl my-5"
                            />
                        </div>
                        <div className="my-5 text-xl">
                            <p>
                                Descrizione:{" "}
                                <span className="italic"> {post.content}</span>
                            </p>
                            <p>Categoria: {post.category.name}</p>
                            <p className="my-5">
                                {post.tags.length > 0
                                    ? post.tags.map((tag, index) => (
                                          <span
                                              key={index}
                                              className="inline-block text-[#333] bg-[#cfef00] mr-2 px-2.5 py-1 my-1 font-bold rounded-full text-[0.7em] transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#b5d900] hover:-translate-y-0.5"
                                          >
                                              #{tag.name}
                                          </span>
                                      ))
                                    : "Nessun tag"}
                            </p>
                            <p>Pubblicato: {post.published ? "Sì" : "No"}</p>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
