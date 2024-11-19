import axios from "../components/utils/axiosClient";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RiArrowGoBackLine as TornaIndietro } from "react-icons/ri";
import { IoMdTrash as Cestino } from "react-icons/io";

// Material UI components
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export default function SinglePost() {
    // Recupero lo slug come parametro
    const { slug } = useParams();

    // State per il singolo post (inizializzato come oggetto vuoto)
    const [post, setPost] = useState({});
    // State per il loading
    const [loading, setLoading] = useState(true);
    // State per l'errore
    const [error, setError] = useState(null);
    // State per la modale di conferma eliminazione
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();
    const { user } = useAuth();

    // Funzione per recuperare il singolo post
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

    // Funzione per aprire la modale di conferma eliminazione
    const openDeleteModal = () => {
        setIsModalOpen(true);
    };

    // Funzione per chiudere la modale di conferma eliminazione
    const closeDeleteModal = () => {
        setIsModalOpen(false);
    };

    // Funzione per confermare l'eliminazione del post
    const confirmDelete = async () => {
        try {
            await handleDelete();
            closeDeleteModal();
        } catch (error) {
            setError("Errore nell'eliminazione del post");
            console.error("Error confirming post deletion:", error);
        }
    };

    // Funzione per eliminare il post
    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${slug}`);
            navigate("/posts");
        } catch (error) {
            setError("Errore nell'eliminazione del post");
            console.error("Error deleting post:", error);
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
                <div className="p-16">
                    {/* Torna indietro e elimina post */}
                    <div className="flex justify-between">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-1 text-lg my-button text-black mb-10"
                        >
                            <TornaIndietro className="text-3xl" /> Torna
                            Indietro
                        </button>
                        {user.isAdmin && (
                            <button
                                className="flex items-center gap-1 text-lg my-button text-black mb-10"
                                onClick={openDeleteModal}
                            >
                                Elimina Post <Cestino className="text-3xl" />
                            </button>
                        )}
                    </div>

                    {/* Contenuto del singolo post */}
                    <div>
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
                                Descrizione:
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

            {/* Modale di conferma eliminazione */}
            {isModalOpen && (
                <Dialog open={isModalOpen} onClose={closeDeleteModal}>
                    <DialogTitle>{"Conferma Eliminazione"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Sei sicuro di voler eliminare questo post? Questa
                            azione non può essere annullata.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeDeleteModal} color="primary">
                            Annulla
                        </Button>
                        <Button onClick={confirmDelete} color="error">
                            Elimina
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </main>
    );
}
