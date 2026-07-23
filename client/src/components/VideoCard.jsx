import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";

function VideoCard({ video }) {

    const navigate = useNavigate();   // 👈 IMPORTANT

    const handleClick = () => {
        navigate(`/video/${video._id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="bg-zinc-900 rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition"
        >
            <button
                onClick={() => handleRemove(video._id)}
                className="mt-3 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
                Remove
            </button>

            <img
                src={video.thumbnail}
                className="w-full h-[180px] object-cover"
            />

            <div className="p-3">

                <h2 className="text-white font-semibold text-sm line-clamp-2">
                    {video.title}
                </h2>

                <p className="text-gray-400 text-xs mt-1">
                    {video.channel}
                </p>

                <div className="flex items-center gap-2 text-gray-500 text-xs mt-2">
                    <FaRegEye />
                    <span>{video.views} views</span>
                    <span>•</span>
                    <span>{video.time}</span>
                </div>

            </div>
        </div>

    );
}

export default VideoCard;