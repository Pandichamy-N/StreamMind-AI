import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHistory } from "../api/videoApi";

function History() {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {

            const token = localStorage.getItem("token");

            const res = await getHistory(token);

            setVideos(res.data.history);

        } catch (error) {

            console.log(error);

        }
    };

    return (

        <div className="p-6 text-white">

            <h1 className="text-3xl font-bold mb-6">
                Watch History
            </h1>

            {videos.length === 0 ? (

                <div className="text-center mt-20">

                    <h2 className="text-2xl font-bold">
                        No History Yet 📺
                    </h2>

                    <p className="text-gray-400 mt-2">
                        Watch a video to see it here.
                    </p>

                </div>

            ) : (

                <div className="grid grid-cols-4 gap-6">

                    {videos.map((video) => (

                        <Link
                            key={video._id}
                            to={`/video/${video._id}`}
                            className="bg-zinc-900 rounded-xl overflow-hidden p-3"
                        >

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

                    ))}

                </div>

            )}

        </div>

    );

}

export default History;