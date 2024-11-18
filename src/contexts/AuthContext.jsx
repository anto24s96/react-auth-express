import { createContext, useContext } from "react";
import useStorage from "../components/hooks/useStorage";
import { useNavigate } from "react-router-dom";
import axios from "../components/utils/axiosClient";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useStorage(null, "user");
    const isLoggedIn = user !== null;

    const navigate = useNavigate();

    const login = async (payload) => {
        try {
            const { data: response } = await axios.post("/auth/login", payload);
            setUser(response.data);
            localStorage.setItem("accessToken", response.token);
            navigate("/");
        } catch (err) {
            const { message, errors } = err.response.data; // Aggiungi message qui
            const error = new Error(message || "Errore nel login");
            error.errors = errors || [];
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("accessToken");
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const value = useContext(AuthContext);

    if (value === undefined) {
        throw new Error("Non sei dentro all' Auth Provider");
    }

    return value;
};

export { AuthProvider, useAuth };
