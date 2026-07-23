import { useState } from "react";
import { addVideo } from "../api/videoApi";
import { useNavigate } from "react-router-dom";
import { uploadFile } from "../api/uploadApi";

function UploadVideo() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        channel: "",
        category: "Education",
        duration: "",
        time: "Just now",
        videoUrl: "",
        thumbnail: "",
    });
    const [videoFile, setVideoFile] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setUploading(true);

            // Upload Thumbnail
            const thumbnailRes = await uploadFile(thumbnailFile);

            // Upload Video
            const videoRes = await uploadFile(videoFile);

            const newVideo = {

                ...formData,

                thumbnail: thumbnailRes.url,

                videoUrl: videoRes.url,

                views: 0,

            };

            await addVideo(newVideo);

            alert("✅ Video Uploaded Successfully!");

            navigate("/");

        } catch (error) {

            console.log(error);

            alert("❌ Upload Failed!");

        } finally {

            setUploading(false);

        }

    };

    return (
        <div className="max-w-3xl mx-auto py-6">

            <h1 className="text-3xl font-bold text-white mb-8">
                Upload Video
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-zinc-900 p-8 rounded-xl space-y-5 shadow-lg"
            >

                {/* Video Title */}
                <input
                    type="text"
                    name="title"
                    placeholder="Video Title"
                    value={formData.title}
                    onChange={handleChange}
                />

                {/* Channel Name */}
                <input
                    type="text"
                    name="channel"
                    placeholder="Channel Name"
                    value={formData.channel}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-zinc-800 text-white outline-none border border-zinc-700 focus:border-purple-500"
                />

                {/* YouTube URL */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setThumbnailFile(e.target.files[0])}
                    className="w-full p-3 rounded-lg bg-zinc-800 text-white"
                />

                {/* Video Category */}
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option>Education</option>
                    <option>Programming</option>
                    <option>Gaming</option>
                    <option>Music</option>
                    <option>Technology</option>
                    <option>Entertainment</option>
                    <option>Sports</option>
                </select>

                {/* Video  Picker File */}
                <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files[0])}
                    className="w-full p-3 rounded-lg bg-zinc-800 text-white"
                />

                {/* Video Duration */}
                <input
                    type="text"
                    name="duration"
                    placeholder="10:35"
                    value={formData.duration}
                    onChange={handleChange}
                />

                {/* Views */}
                <input
                    type="text"
                    name="views"
                    placeholder="Views (Example: 1.2M)"
                    value={formData.views}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-zinc-800 text-white outline-none border border-zinc-700 focus:border-purple-500"
                />

                {/* Upload Time */}
                <input
                    type="text"
                    name="time"
                    placeholder="Upload Time (Example: 2 days ago)"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-zinc-800 text-white outline-none border border-zinc-700 focus:border-purple-500"
                />

                {/* Button */}
                <button
                    type="submit"
                    disabled={uploading}
                    className="w-full bg-purple-600 hover:bg-purple-700 transition py-3 rounded-lg text-white font-semibold"
                >
                    {uploading ? "Uploading..." : "Upload Video"}
                </button>

            </form>

        </div>
    );
}

export default UploadVideo;