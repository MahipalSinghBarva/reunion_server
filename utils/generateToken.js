const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/userModel");

const generateToken = (user, res) => {
    const token = user.getJWTToken();

    if (!token) {
        return res.status(400).json({
            message: "Token generation failed",
        });
    }

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
    };

    return res
        .status(200)
        .cookie("token", token, options)
        .json({
            message: "Login Successfully",
            user,
            token,
        });
};

module.exports = generateToken;
