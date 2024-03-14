const jwt = require("jsonwebtoken");
const userSchema = require("../model/userSchema");

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Assuming you're storing token in cookies
        if (!token) {
            throw new Error("Authentication failed! Please login.");
        }

        const verifiedUser = jwt.verify(token, process.env.SECRET_KEY);
        const user = await userSchema.findOne({ _id: verifiedUser._id });

        if (!user) {
            throw new Error("User not found!");
        }

        req.user = user;
        next();
    } catch (error) {
        // console.error(error);
        res.status(401).json({ error: "Unauthorized!" });
    }
};

module.exports = authenticate;
