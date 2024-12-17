const User = require("../models/userModel")
const generateToken = require('../utils/generateToken')
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const register = await User.create({ name, email, password });

        return res.status(201).json({
            message: "User registered successfully",
            user: register,
        });
    } catch (error) {
        console.error("Failed to register user", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    try {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({
                message: "User is not registered"
            });
        }

        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            return res.status(400).json({
                message: "Wrong password"
            });
        }
        generateToken(user, res);

    } catch (error) {
        console.error("Failed to login user", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    try {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({
                message: "User is not registered"
            });
        }

        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            return res.status(400).json({
                message: "Wrong password"
            });
        }
        generateToken(user, res);

    } catch (error) {
        console.error("Failed to login user", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

exports.logoutUser = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(0),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while logging out",
            error: error.message,
        });
    }
};
