import {
    FaHome,
    FaFire,
    FaThLarge,
    FaHeart,
    FaHistory,
    FaUser,
    FaVideo,
    FaChartBar,
} from "react-icons/fa";

import { FaUpload } from "react-icons/fa6";
import { FaList } from "react-icons/fa";

import { NavLink } from "react-router-dom";

function Sidebar() {

    const menuItems = [
        {
            icon: <FaHome />,
            name: "Home",
            path: "/",
        },
        {
            icon: <FaFire />,
            name: "Trending",
            path: "/trending",
        },
        {
            icon: <FaThLarge />,
            name: "Categories",
            path: "/categories",
        },
        {
            icon: <FaHeart />,
            name: "Favorites",
            path: "/favorites",
        },
        {
            icon: <FaHistory />,
            name: "History",
            path: "/history",
        },
        {
            icon: <FaUpload />,
            name: "Upload",
            path: "/upload",
        },
        {
            icon: <FaVideo />,
            name: "My Uploads",
            path: "/myuploads",
        },
        {
            icon: <FaChartBar />,
            name: "Dashboard",
            path: "/dashboard",
        },
        {
            icon: <FaList />,
            name: "Playlists",
            path: "/playlists",
        },
        {
            icon: "🔖",
            name: "Watch Later",
            path: "/watchlater",
        },
        {
            icon: <FaUser />,
            name: "Profile",
            path: "/profile",
        },
    ];

    return (
        <aside className="w-64 min-h-screen bg-zinc-900 border-r border-zinc-800">

            <div className="p-5">

                {menuItems.map((item) => (

                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-4 p-4 rounded-xl mb-2 transition-all duration-300 ${isActive
                                ? "bg-purple-600 text-white"
                                : "hover:bg-zinc-800 text-gray-300"
                            }`
                        }
                    >
                        <span className="text-xl">
                            {item.icon}
                        </span>

                        <span className="text-lg">
                            {item.name}
                        </span>

                    </NavLink>

                ))}

            </div>

        </aside>
    );
}

export default Sidebar;