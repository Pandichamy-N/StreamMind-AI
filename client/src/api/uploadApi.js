import axios from "axios";

const API_URL = "http://localhost:5000/api/upload";

export const uploadFile = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    const res = await axios.post(API_URL, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
};