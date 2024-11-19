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
import SignUp from "./pages/SignUp";
import AdminPage from "./components/middlewares/AdminPage";

export default function () {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="posts" element={<Posts />} />
                <Route path="*" element={<NotFound />} />
            </Route>

            {/* Private Routes */}
            <Route
                path="/"
                element={
                    <PrivatePage>
                        <DefaultLayout />
                    </PrivatePage>
                }
            >
                <Route path="posts/:slug" element={<SinglePost />} />
            </Route>

            {/* Admin Routes */}
            <Route
                path="/"
                element={
                    <PrivatePage>
                        <AdminPage>
                            <DefaultLayout />
                        </AdminPage>
                    </PrivatePage>
                }
            >
                <Route path="create" element={<CreatePost />} />
            </Route>
        </Routes>
    );
}
