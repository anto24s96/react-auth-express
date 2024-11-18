import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

export default function () {
    const { login, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const initialData = {
        email: "",
        password: "",
    };

    const [formData, setFormData] = useState(initialData);
    const [loginError, setLoginError] = useState([]);

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    const handleField = (e) => {
        const { name, value } = e.target;
        setFormData((data) => ({ ...data, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(formData);
            setFormData(initialData);
        } catch (error) {
            setLoginError(error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-xs bg-white p-6 rounded-lg shadow-lg"
            >
                <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Login
                </h1>
                <div className="flex flex-col gap-4 text-gray-700">
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleField}
                        className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#cfef00] transition-all duration-200"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleField}
                        className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#cfef00] transition-all duration-200"
                    />
                    {loginError !== null && (
                        <p className="text-red-500">{loginError.message}</p>
                    )}

                    {loginError?.errors &&
                        loginError.errors.map((error, index) => (
                            <p key={index} className="text-red-500">
                                {error.msg}
                            </p>
                        ))}

                    <button
                        type="submit"
                        className="cursor-pointer font-bold transition-all duration-200 py-2 px-6 rounded-full bg-[#cfef00] border border-transparent text-center shadow-lg hover:bg-[#c4e201] hover:border-[#b5d900] active:scale-95"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}