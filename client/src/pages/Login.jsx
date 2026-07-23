import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Login Function
    const handleLogin = async () => {
        console.log({
            email,
            password
        });
        try {

            const data = await loginUser({
                email,
                password,
            });

            console.log(data);

            alert("✅ Login Successful");

            localStorage.setItem("token", data.token);
            navigate("/");

        } catch (error) {
            console.log("Full Error:", error);
            console.log("Response:", error.response);

            alert(error.response?.data?.message || "Login Failed");
        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-zinc-950">

            <div className="bg-zinc-900 p-8 rounded-xl w-96">

                <h1 className="text-3xl font-bold text-white mb-6">
                    Login
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded mb-4 bg-zinc-800 text-white"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded mb-4 bg-zinc-800 text-white"
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-red-600 hover:bg-red-700 py-3 rounded text-white"
                >
                    Login
                </button>

            </div>

        </div>

    );

}

export default Login;