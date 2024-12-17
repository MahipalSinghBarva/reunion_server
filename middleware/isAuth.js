const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const isAuthUser = async (req, res, next) => {
    const token = req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ", "");
    // console.log("Token:", token);

    if (!token) {
        return res.status(401).json({
            message: "Token not found",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        next();
    } catch (error) {
        console.error("Error during authentication:", error.message);
        return res.status(403).json({
            message: "Invalid token or unauthorized",
        });
    }
};

module.exports = isAuthUser;
