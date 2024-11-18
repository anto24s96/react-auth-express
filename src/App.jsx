import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import DefaultLayout from "./components/layouts/DefaultLayout";
import Posts from "./pages/Posts";
import SinglePost from "./pages/SinglePost";
import CreatePost from "./pages/CreatePost";
import NotFound from "./pages/NotFound";
import PrivatePage from "./components/middlewares/PrivatePage";
import Login from "./pages/Login";

export default function () {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="posts">
                    <Route index element={<Posts />} />
                    <Route path=":slug" element={<SinglePost />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route>

            {/* Private Routes */}
            <Route path="/" element={<DefaultLayout />}>
                <Route
                    path="create"
                    element={
                        <PrivatePage>
                            <CreatePost />
                        </PrivatePage>
                    }
                />
            </Route>
        </Routes>
    );
}
