import User from "../models/User.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import generateToken from "../utils/generateToken.js";
import mongoose from "mongoose";

// ================= REGISTER =================
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email",
            });
        }

        const existingUser = await User.findOne({
            email: email.toLowerCase().trim(),
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email: email.toLowerCase().trim(),
            password: hashedPassword,
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ================= LOGIN =================
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("📩 Frontend Email:", email);
        console.log("📂 Database Name:", mongoose.connection.name);

        const user = await User.findOne({
            email: email.toLowerCase().trim(),
        });

        console.log("👤 User Found:", user);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password",
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};