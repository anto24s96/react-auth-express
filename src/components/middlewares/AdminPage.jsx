import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function ({ children }) {
    const { user } = useAuth();

    if (!user.isAdmin) return <Navigate to="/" />;

    return children;
}
