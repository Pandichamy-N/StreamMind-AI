import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        channel: {
            type: String,
            required: true,
            trim: true,
        },

        thumbnail: {
            type: String,
            required: true,
        },

        videoUrl: {
            type: String,
            required: true,
        },

        videoId: {
            type: String,
            default: "",
        },

        // Total Views
        views: {
            type: Number,
            default: 0,
        },

        // Uploaded Time
        time: {
            type: String,
            required: true,
        },

        // Video Duration (Example: 10:35)
        duration: {
            type: String,
            default: "0:00",
        },

        // Video Category
        category: {
            type: String,
            default: "General",
        },

        // Likes
        likes: {
            type: Number,
            default: 0,
        },

        // Comments
        comments: [
            {
                username: {
                    type: String,
                    required: true,
                },

                text: {
                    type: String,
                    required: true,
                },

                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Video", videoSchema);