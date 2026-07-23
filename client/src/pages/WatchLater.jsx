import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getWatchLater,
    removeWatchLater,
} from "../api/videoApi";

function WatchLater() {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchWatchLater();
    }, []);

    const fetchWatchLater = async () => {
        try {

            const token = localStorage.getItem("token");

            const res = await getWatchLater(token);

            setVideos(res.data.watchLater);

        } catch (error) {

            console.log(error);

        }
    };

    const handleRemove = async (id) => {

        try {

            const token = localStorage.getItem("token");

            await removeWatchLater(id, token);

            setVideos((prev) =>
                prev.filter((video) => video._id !== id)
            );

            alert("✅ Removed from Watch Later");

        } catch (error) {

            console.log(error);

            alert("❌ Remove Failed");

        }

    };

    return (

        <div className="p-6 text-white">

            <h1 className="text-3xl font-bold mb-6">
                Watch Later
            </h1>

            {videos.length === 0 ? (

                <div className="text-center mt-20">

                    <h2 className="text-2xl font-bold">
                        No Videos Found 😔
                    </h2>

                    <p className="text-gray-400 mt-2">
                        Add videos to Watch Later.
                    </p>

                </div>

            ) : (

                <div className="grid grid-cols-4 gap-6">

                    {videos.map((video) => (

                        <div
                            key={video._id}
                            className="bg-zinc-900 rounded-xl overflow-hidden p-3"
                        >

                            <Link to={`/video/${video._id}`}>

                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="rounded-lg"
                                />

                                <h2 className="font-bold mt-3">
                                    {video.title}
                                </h2>

                                <p className="text-gray-400">
                                    {video.channel}
                                </p>

                            </Link>

                            <button
                                onClick={() => handleRemove(video._id)}
                                className="w-full mt-4 bg-red-600 hover:bg-red-700 py-2 rounded-lg"
                            >
                                Remove
                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}

export default WatchLater;