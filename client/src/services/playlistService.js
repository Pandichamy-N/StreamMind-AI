import axios from "axios";

const PLAYLIST_API = "http://localhost:5000/api/playlists";

const getToken = () => localStorage.getItem("token");

// ================= CREATE PLAYLIST =================
export const createPlaylist = async (name) => {
    const response = await axios.post(
        PLAYLIST_API,
        { name },
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );

    return response.data;
};

// ================= GET PLAYLISTS =================
export const getMyPlaylists = async () => {
    const response = await axios.get(
        PLAYLIST_API,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );

    return response.data;
};

export const addVideoToPlaylist = async (
    playlistId,
    videoId
) => {

    const response = await axios.put(
        `${PLAYLIST_API}/${playlistId}/${videoId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );

    return response.data;
};