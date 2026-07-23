import { useEffect, useState, useContext } from "react";
import VideoCard from "../components/VideoCard";
import { getVideos } from "../api/videoApi";
import { SearchContext } from "../context/SearchContext";

function Home() {

    const [videos, setVideos] = useState([]);
    const { search } = useContext(SearchContext);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const res = await getVideos();
            setVideos(res.data);
        } catch (error) {
            console.log("Error fetching videos:", error);
        }
    };

    const filteredVideos = videos.filter((video) =>
        video.title.toLowerCase().includes(search.toLowerCase()) ||
        video.channel.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div>

            {search && (
                <h2 className="text-white text-xl font-semibold mb-5">
                    Search Results for "
                    <span className="text-purple-400">
                        {search}
                    </span>
                    "
                </h2>
            )}

            {filteredVideos.length === 0 ? (

                <div className="text-center mt-20">

                    <h1 className="text-3xl text-gray-400">
                        😔 No Videos Found
                    </h1>

                </div>

            ) : (

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

                    {filteredVideos.map((video) => (
                        <VideoCard
                            key={video._id}
                            video={video}
                        />
                    ))}

                </div>

            )}

        </div>

    );
}

export default Home;