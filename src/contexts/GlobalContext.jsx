import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import axios from "../components/utils/axiosClient";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [posts, setPosts] = useState([]);

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get(`/categories`);
            setCategories(data.categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchTags = async () => {
        try {
            const { data } = await axios.get(`/tags`);
            setTags(data.tags);
        } catch (error) {
            console.error("Error fetching tags:", error);
        }
    };

    const reFetchPosts = async (page = 1) => {
        try {
            const { data } = await axios.get(`/posts?page=${page}`);
            setPosts(data.posts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchTags();
        reFetchPosts();
    }, []);

    return (
        <GlobalContext.Provider
            value={{ categories, tags, posts, reFetchPosts }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

const useGlobal = () => {
    const value = useContext(GlobalContext);
    //Se non sono dentro al Global Provider, lancio un errore
    if (value === undefined) {
        throw new Error("Non sei dentro al Global Provider");
    }

    return value;
};

export { GlobalProvider, useGlobal };
