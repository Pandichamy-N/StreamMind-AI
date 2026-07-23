import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getVideos } from "../api/videoApi";

function RelatedVideos({ currentId }) {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchVideos();
    }, [currentId]);

    const fetchVideos = async () => {
        try {

            const res = await getVideos();

            const filtered = res.data.filter(
                (video) => video._id !== currentId
            );

            setVideos(filtered);

        } catch (error) {

            console.log(error);

        }
    };

    return (

        <div>

            <h2 className="text-white text-2xl font-bold mb-5">
                Related Videos
            </h2>

            <div className="space-y-4">

                {videos.map((video) => (

                    <Link
                        key={video._id}
                        to={`/video/${video._id}`}
                    >

                        <div className="flex gap-3 hover:bg-zinc-900 p-2 rounded-xl transition">

                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-40 h-24 object-cover rounded-lg"
                            />

                            <div className="flex-1">

                                <h3 className="text-white font-semibold line-clamp-2">
                                    {video.title}
                                </h3>

                                <p className="text-gray-400 text-sm mt-1">
                                    {video.channel}
                                </p>

                                <p className="text-gray-500 text-xs mt-1">
                                    👁 {video.views} views
                                </p>

                                <p className="text-gray-500 text-xs">
                                    ⏰ {video.time}
                                </p>

                            </div>

                        </div>

                    </Link>

                ))}

            </div>

        </div>

    );
}

export default RelatedVideos;