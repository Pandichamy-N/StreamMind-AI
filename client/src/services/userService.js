import axios from "axios";

const USER_API = "http://localhost:5000/api/user";

// ================= PROFILE =================
export const getProfile = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${USER_API}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

// ================= SUBSCRIBE =================
export const subscribeToChannel = async (channelId) => {
    const token = localStorage.getItem("token");

    const response = await axios.put(
        `${USER_API}/subscribe/${channelId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

// ================= UNSUBSCRIBE =================
export const unsubscribeFromChannel = async (channelId) => {
    const token = localStorage.getItem("token");

    const response = await axios.delete(
        `${USER_API}/subscribe/${channelId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

// ================= CHECK SUBSCRIPTION =================
export const checkSubscription = async (channelId) => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${USER_API}/subscribe/${channelId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const uploadProfilePic = async (formData) => {
    const token = localStorage.getItem("token");

    const res = await axios.put(
        `${USER_API}/profile/upload`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return res.data;
};