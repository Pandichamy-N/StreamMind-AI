import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

function Navbar() {
    const { search, setSearch } = useContext(SearchContext);

    return (
        <div className="flex items-center justify-between bg-zinc-900 px-6 py-4 border-b border-zinc-800">

            {/* Logo */}
            <div>
                <h1 className="text-2xl font-bold text-red-500">
                    StreamMind AI
                </h1>
            </div>

            {/* Search Box */}
            <div className="flex items-center bg-zinc-800 rounded-lg px-4 py-2 w-[400px]">

                <FaSearch className="text-gray-400" />

                <input
                    type="text"
                    placeholder="Search videos..."
                    className="bg-transparent outline-none text-white ml-3 w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            {/* Right Side */}
            <div className="flex items-center gap-5">

                <FaBell
                    className="text-white text-xl cursor-pointer"
                />

                <FaUserCircle
                    className="text-white text-3xl cursor-pointer"
                />

            </div>

        </div>
    );
}

export default Navbar;