import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../contexts/AuthContext";

export default function () {
    const { isLoggedIn, logout } = useAuth();
    const location = useLocation();

    return (
        <header className="h-20 bg-[#b52c0a] grid grid-cols-3 items-center sticky top-0 z-50 px-6">
            {/* Titolo */}
            <h1 className="text-white text-3xl font-semibold tracking-wide">
                Cooking Blog
            </h1>

            {/* Navbar */}
            <div className="flex justify-center">
                <Navbar />
            </div>

            {/* Contenitore per pulsanti */}
            <div className="flex justify-end space-x-4">
                {/* Se l'utente non è loggato, mostra il pulsante per il login */}
                {!isLoggedIn && location.pathname !== "/login" && (
                    <button className="my-button text-[#b52c0a]">
                        <Link to="/login">Login</Link>
                    </button>
                )}

                {/* Se l'utente è loggato, mostra il pulsante per creare un post e il logout */}
                {isLoggedIn && (
                    <>
                        {/* Nascond il bottone "Create Post" se siamo già nella pagina /create */}
                        {location.pathname !== "/create" && (
                            <button className="my-button text-gray-700">
                                <Link to="/create">Create Post</Link>
                            </button>
                        )}
                        {/* Pulsante per il logout */}
                        <button
                            onClick={() => {
                                logout();
                            }}
                            className="my-button text-gray-700"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}
