import axios from "axios";

const API_URL = "http://localhost:5000/api/videos";
const USER_API = "http://localhost:5000/api/user";

// ================= VIDEO =================

// Get all videos
export const getVideos = () => {
    return axios.get(API_URL);
};

// Add new video
export const addVideo = (videoData) => {
    const token = localStorage.getItem("token");

    return axios.post(
        API_URL,
        videoData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

// Like video
export const likeVideo = (id) => {
    const token = localStorage.getItem("token");

    return axios.put(
        `${API_URL}/${id}/like`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

// Add comment
export const addComment = (id, commentData) => {
    const token = localStorage.getItem("token");

    return axios.post(
        `${API_URL}/${id}/comment`,
        commentData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

// ================= WATCH LATER =================

// Add Watch Later
export const addToWatchLater = (id, token) => {
    return axios.put(
        `${USER_API}/watchlater/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

// Get Watch Later
export const getWatchLater = (token) => {
    return axios.get(
        `${USER_API}/watchlater`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

// Remove Watch Later
export const removeWatchLater = (id, token) => {
    return axios.delete(
        `${USER_API}/watchlater/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

// ================= HISTORY =================

// Add History
export const addToHistory = (id, token) => {
    return axios.put(
        `${USER_API}/history/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

// Get History
export const getHistory = (token) => {
    return axios.get(
        `${USER_API}/history`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
export const getMyVideos = () => {
    const token = localStorage.getItem("token");

    return axios.get(`${API_URL}/myvideos`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const deleteVideo = (id) => {
    const token = localStorage.getItem("token");

    return axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};


export const getChannelVideos = (userId) => {
    return axios.get(`${API_URL}/channel/${userId}`);
};

export const getDashboard = async () => {
    const token = localStorage.getItem("token");

    return axios.get(`${API_URL}/dashboard`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const increaseView = (videoId) =>
    axios.put(`${API_URL}/view/${videoId}`);

export const updateVideo = (id, data) => {

    const token = localStorage.getItem("token");

    return axios.put(
        `${API_URL}/${id}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

};

export const getDashboardStats = () =>
    axios.get(`${API_URL}/dashboard/stats`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });