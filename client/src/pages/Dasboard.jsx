import { useEffect, useState } from "react";
import { getDashboard } from "../api/videoApi";

function Dashboard() {

    const [data, setData] = useState(null);
    const [stats, setStats] = useState({
        totalVideos: 0,
        totalViews: 0,
        totalLikes: 0,
        totalComments: 0,
    });

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {

        const res = await getDashboardStats();

        setStats(res.data);

    };
    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const res = await getDashboard();
            setData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    if (!data) {
        return (
            <div className="text-white p-8 text-xl">
                Loading...
            </div>
        );
    }

    return (
        <div className="p-8 text-white">

            <h1 className="text-4xl font-bold mb-8">
                📊 Creator Dashboard
            </h1>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-zinc-900 rounded-xl p-6">
                    <h3>Total Videos</h3>
                    <p className="text-3xl font-bold">
                        {stats.totalVideos}
                    </p>
                </div>

                <div className="bg-zinc-900 rounded-xl p-6">
                    <h3>Total Views</h3>
                    <p className="text-3xl font-bold">
                        {stats.totalViews}
                    </p>
                </div>

                <div className="bg-zinc-900 rounded-xl p-6">
                    <h3>Total Likes</h3>
                    <p className="text-3xl font-bold">
                        {stats.totalLikes}
                    </p>
                </div>

                <div className="bg-zinc-900 rounded-xl p-6">
                    <h3>Total Comments</h3>
                    <p className="text-3xl font-bold">
                        {stats.totalComments}
                    </p>
                </div>

            </div>

            <h2 className="text-2xl font-bold mt-10 mb-5">
                Recent Uploads
            </h2>

            <div className="space-y-4">

                {data.videos.map((video) => (

                    <div
                        key={video._id}
                        className="bg-zinc-900 rounded-xl p-5 flex justify-between"
                    >

                        <div>
                            <h3 className="font-semibold text-lg">
                                {video.title}
                            </h3>

                            <p className="text-gray-400">
                                {video.views} Views
                            </p>
                        </div>

                        <p className="text-purple-400">
                            ❤️ {video.likes}
                        </p>

                    </div>

                ))}

            </div>

        </div >
    );
}

export default Dashboard;