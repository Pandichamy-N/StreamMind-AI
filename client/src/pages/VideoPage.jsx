import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaThumbsUp } from "react-icons/fa";
import RelatedVideos from "../components/RelatedVideos";
import {
    likeVideo,
    addComment,
    addToWatchLater,
    addToHistory,
} from "../api/videoApi";
import {
    subscribeToChannel,
    unsubscribeFromChannel,
    checkSubscription,
} from "../services/userService";
import {
    getMyPlaylists,
    addVideoToPlaylist,
} from "../services/playlistService";

function VideoPage() {

    const { id } = useParams();

    const [video, setVideo] = useState(null);
    const [likes, setLikes] = useState(0);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    const [subscriberCount, setSubscriberCount] = useState(0);
    const [subscribed, setSubscribed] = useState(false);

    const [playlists, setPlaylists] = useState([]);
    const [showPlaylist, setShowPlaylist] = useState(false);


    useEffect(() => {
        fetchVideo();
    }, [id]);

    useEffect(() => {
        loadPlaylists();
    }, []);

    const loadPlaylists = async () => {
        try {
            const data = await getMyPlaylists();
            setPlaylists(data.playlists);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {

        const loadVideo = async () => {

            const res = await getVideo(id);

            setVideo(res.data);

            await increaseView(id);

        };

        loadVideo();

    }, [id]);


    // ================= FETCH VIDEO =================
    const fetchVideo = async () => {
        try {

            const res = await axios.get(
                `http://localhost:5000/api/videos/${id}`
            );

            console.log(res.data);

            setVideo(res.data);
            setLikes(res.data.likes || 0);
            setComments(res.data.comments || []);


            if (res.data.user) {
                setSubscriberCount(
                    res.data.user.subscribers?.length || 0
                );

                const token = localStorage.getItem("token");

                if (token) {
                    const result = await checkSubscription(
                        res.data.user._id
                    );

                    setSubscribed(result.subscribed);
                }
            }

            const token = localStorage.getItem("token");

            if (token) {
                await addToHistory(res.data._id, token);
            }

        } catch (error) {

            console.log(error);

        }
    };

    // ================= LOADING =================
    if (!video) {
        return (
            <div className="text-white text-2xl p-10">
                Loading...
            </div>
        );
    }

    // ================= LIKE =================
    const handleLike = async () => {
        try {

            const res = await likeVideo(video._id);

            setLikes(res.data.likes);

        } catch (error) {

            console.log(error);

        }
    };

    // ================= WATCH LATER =================
    const handleWatchLater = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await addToWatchLater(
                video._id,
                token
            );

            alert(res.data.message);

        } catch (error) {

            console.log(error.response);

            alert(
                error.response?.data?.message ||
                "Failed"
            );

        }

    };
    const handleSubscribe = async () => {
        try {

            if (!video.user) {
                alert("Channel information not found.");
                return;
            }

            await subscribeToChannel(video.user._id);

            setSubscribed(true);
            setSubscriberCount((prev) => prev + 1);

        } catch (error) {
            console.log(error);
        }
    };
    const handleUnsubscribe = async () => {
        try {

            await unsubscribeFromChannel(video.user._id);

            setSubscribed(false);

            setSubscriberCount((prev) => prev - 1);

        } catch (error) {

            console.log(error);

        }
    };

    // ================= COMMENT =================
    const handleComment = async () => {

        if (!comment.trim()) return;

        try {

            const res = await addComment(video._id, {
                username: "Pandichamy",
                text: comment,
            });

            setComments(res.data.comments);

            setComment("");

        } catch (error) {

            console.log(error);

        }

    };
    const handleSaveToPlaylist = async (playlistId) => {

        try {

            await addVideoToPlaylist(
                playlistId,
                video._id
            );

            alert("✅ Video Added Successfully");

            setShowPlaylist(false);

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Something went wrong"
            );

        }

    };


    // ================= UI =================
    return (

        <div className="grid grid-cols-12 gap-6 p-6 text-white">

            {/* LEFT */}
            <div className="col-span-8">

                <div className="w-full aspect-video rounded-xl overflow-hidden bg-black">

                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.videoId}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>

                </div>

                <div className="mt-5">

                    <h1 className="text-3xl font-bold">
                        {video.title}
                    </h1>

                    <div className="flex items-center justify-between mt-3">

                        <div>

                            <Link
                                to={`/channel/${video.user?._id}`}
                                className="text-lg font-semibold hover:text-purple-400 transition"
                            >
                                {video.channel}
                            </Link>

                            <p className="text-gray-400 text-sm">
                                {subscriberCount} Subscribers
                            </p>

                        </div>

                        {subscribed ? (

                            <button
                                onClick={handleUnsubscribe}
                                className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-full"
                            >
                                ✓ Subscribed
                            </button>

                        ) : (

                            <button
                                onClick={handleSubscribe}
                                className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full"
                            >
                                Subscribe
                            </button>

                        )}

                    </div>

                    <div className="flex gap-4 mt-4">

                        <span>{video.views} views</span>

                        <span>{video.time}</span>

                    </div>

                    <div className="flex gap-3 mt-5">

                        <button
                            onClick={handleLike}
                            className="flex items-center gap-2 bg-zinc-800 hover:bg-purple-600 px-5 py-2 rounded-lg"
                        >
                            <FaThumbsUp />
                            {likes} Likes
                        </button>

                        <button
                            onClick={handleWatchLater}
                            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
                        >
                            🔖 Watch Later
                        </button>
                        <button
                            onClick={() =>
                                setShowPlaylist(!showPlaylist)
                            }
                            className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg"
                        >
                            💾 Save
                        </button>
                        {
                            showPlaylist && (

                                <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 mt-4 w-80">

                                    <h2 className="text-xl font-bold mb-4">
                                        Save to Playlist
                                    </h2>

                                    {
                                        playlists.length === 0 ? (

                                            <p className="text-gray-400">
                                                No Playlists Found
                                            </p>

                                        ) : (

                                            playlists.map((playlist) => (

                                                <button
                                                    key={playlist._id}
                                                    onClick={() =>
                                                        handleSaveToPlaylist(
                                                            playlist._id
                                                        )
                                                    }
                                                    className="w-full text-left hover:bg-zinc-800 rounded-lg p-3 mb-2"
                                                >

                                                    📂 {playlist.name}

                                                </button>

                                            ))

                                        )
                                    }

                                </div>

                            )
                        }

                    </div>

                </div>

                {/* COMMENTS */}

                <div className="mt-10">

                    <h2 className="text-2xl font-bold mb-4">
                        Comments
                    </h2>

                    <div className="flex gap-3">

                        <input
                            type="text"
                            placeholder="Write a comment..."
                            value={comment}
                            onChange={(e) =>
                                setComment(e.target.value)
                            }
                            className="flex-1 bg-zinc-800 p-3 rounded-lg outline-none"
                        />

                        <button
                            onClick={handleComment}
                            className="bg-purple-600 hover:bg-purple-700 px-6 rounded-lg"
                        >
                            Post
                        </button>

                    </div>

                    <div className="mt-6 space-y-4">

                        {comments.map((item, index) => (

                            <div
                                key={index}
                                className="bg-zinc-900 p-4 rounded-lg"
                            >

                                <h3 className="font-bold">
                                    {item.username}
                                </h3>

                                <p className="text-gray-300 mt-1">
                                    {item.text}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

            {/* RIGHT */}

            <div className="col-span-4">

                <RelatedVideos currentId={id} />

            </div>

        </div>

    );

}

export default VideoPage;