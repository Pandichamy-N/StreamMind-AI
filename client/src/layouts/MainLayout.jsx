import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div className="flex min-h-screen bg-zinc-950">

            {/* Sidebar */}
            <Sidebar />

            {/* Right Section */}
            <div className="flex-1 flex flex-col">

                {/* Navbar */}
                <Navbar />

                {/* Pages */}
                <div className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </div>

            </div>

        </div>
    );
}

export default MainLayout;