import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

export const loginUser = async (userData) => {

    console.log("Email from frontend:", userData.email);

    const response = await API.post("/auth/login", userData);

    return response.data;
};