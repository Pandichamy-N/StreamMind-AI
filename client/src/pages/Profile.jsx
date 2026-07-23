import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { getProfile, uploadProfilePic } from "../services/userService";
import { useNavigate } from "react-router-dom";

function Profile() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {

            const data = await getProfile();

            setUser(data.user);

        } catch (error) {

            console.log(error);

        }
    };

    if (!user) {
        return (
            <div className="text-white p-10 text-xl">
                Loading...
            </div>
        );
    }

    const handleImageUpload = async (e) => {

        try {

            const file = e.target.files[0];

            if (!file) return;

            const formData = new FormData();

            formData.append("profilePic", file);

            await uploadProfilePic(formData);

            fetchProfile();

            alert("✅ Profile Picture Updated");

        } catch (err) {

            console.log(err);

            alert("Upload Failed");

        }

    };

    const handleLogout = () => {

        localStorage.removeItem("token");

        alert("✅ Logged Out Successfully");

        navigate("/login");

    };

    return (

        <div className="flex justify-center items-center min-h-[80vh]">

            <div className="bg-zinc-900 w-[500px] rounded-2xl p-8 shadow-lg">
                <div className="flex flex-col items-center">

                    {user.profilePic ? (

                        <img
                            src={`http://localhost:5000${user.profilePic}`}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-purple-500"
                        />

                    ) : (

                        <FaUserCircle className="text-8xl text-purple-500" />

                    )}

                    <label className="mt-4 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg cursor-pointer text-white">

                        Upload Photo

                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                        />

                    </label>

                </div>

                <h1 className="text-3xl font-bold text-white text-center mt-4">
                    {user.name}
                </h1>

                <p className="text-center text-gray-400 mt-2">
                    {user.email}
                </p>

                <div className="grid grid-cols-2 gap-5 mt-8">

                    <div className="bg-zinc-800 p-5 rounded-xl text-center">

                        <h2 className="text-4xl font-bold text-purple-400">
                            {user.watchLaterCount}
                        </h2>

                        <p className="text-gray-300 mt-2">
                            Watch Later
                        </p>

                    </div>

                    <div className="bg-zinc-800 p-5 rounded-xl text-center">

                        <h2 className="text-4xl font-bold text-blue-400">
                            {user.historyCount}
                        </h2>

                        <p className="text-gray-300 mt-2">
                            History
                        </p>

                    </div>
                    <div className="mt-8">

                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl text-white font-bold"
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Profile;