import axios from "../components/utils/axiosClient";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Paginator from "../components/Paginator";
import CardPost from "../components/CardPost";

export default function () {
    // State per contenere i post
    const [posts, setPosts] = useState([]);
    // State per la pagina corrente
    const [currPage, setCurrPage] = useState(1);
    // State per il numero totale di pagine
    const [totalPages, setTotalPages] = useState(0);
    // State per il loading
    const [loading, setLoading] = useState(false);
    // State per l'errore
    const [error, setError] = useState(null);

    // Fetch per recuperare i post
    const fetchPosts = async (page = currPage) => {
        setLoading(true);
        setError(null);
        try {
            // Simulazione di ritardo di caricamento
            await new Promise((resolve) => setTimeout(resolve, 500));

            const { data } = await axios.get(`/posts?page=${page}&limit=6`);
            setPosts(data.posts);
            setTotalPages(data.totalPages);
            setCurrPage(page);
        } catch (err) {
            setError(
                "Si è verificato un errore durante il caricamento dei post."
            );
            console.error("Error fetching posts:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [currPage]);

    return (
        <main>
            {loading ? (
                <div className="flex justify-center items-center h-screen gap-3">
                    <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-[#b52c0a]"></div>
                    <div className="text-xl">Loading...</div>
                </div>
            ) : error ? (
                <h1>{error}</h1>
            ) : posts.length === 0 ? (
                <h1>Nessun post trovato.</h1>
            ) : (
                <>
                    <Paginator
                        currPage={currPage}
                        totalPages={totalPages}
                        setCurrPage={setCurrPage}
                    />
                    <div className="p-16">
                        <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                            {posts.map((p) => (
                                <li
                                    key={p.slug}
                                    className="flex justify-center group"
                                >
                                    <Link to={`/posts/${p.slug}`}>
                                        <div className="transform group-hover:scale-105 transition-transform duration-300">
                                            <CardPost
                                                slug={p.slug}
                                                title={p.title}
                                                image={
                                                    p.image ||
                                                    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                                                }
                                                content={p.content}
                                                category={p.category.name}
                                                tags={p.tags.map((t) => t.name)}
                                                published={p.published}
                                            />
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </main>
    );
}
