import { NavLink, useNavigate } from "react-router-dom";

const urlPages = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "Posts",
        href: "/posts",
    },
];

export default function Navigation() {
    return (
        <nav>
            <menu className="flex gap-6 items-center">
                {urlPages.map(({ label, href }, i) => (
                    <li
                        key={`urlPages${i}`}
                        className="group font-bold list-none"
                    >
                        <NavLink
                            to={href}
                            className={({ isActive }) =>
                                isActive
                                    ? "opacity-50 pointer-events-none border-b-4 border-[#fffc66] pb-1 transition-all duration-200 ease-in-out"
                                    : "hover:border-b-2 hover:border-[#f9f8ac] hover:pb-1 transition-all duration-200 ease-in-out"
                            }
                        >
                            {label}
                        </NavLink>
                    </li>
                ))}
            </menu>
        </nav>
    );
}
