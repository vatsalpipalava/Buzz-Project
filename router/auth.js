const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Import the authenticate middleware
const authenticate = require("../middleware/authenticate");

require("../database/connection");
const userSchema = require("../model/userSchema");
const cardSchema = require("../model/cardSchema");

// router.get("/", (req, res) => {
//     res.send("Hello from server router.js");
// });

// Register Router
router.post("/register", async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
        return res
            .status(422)
            .json({ error: "Please fill out all details properly." });
    }

    try {
        const userExist = await userSchema.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email already exists." });
        } else if (password != confirmPassword) {
            return res.status(422).json({ error: "Password do not match." });
        } else {
            const user = new userSchema({
                username,
                email,
                password,
                confirmPassword,
            });

            // hasing password before save in userSchema.js

            const userRegister = await user.save();

            if (userRegister) {
                return res
                    .status(201)
                    .json({ message: "User registered successfully." });
            } else {
                return res
                    .status(500)
                    .json({ error: "Failed to register user." });
            }
        }
    } catch (error) {
        console.log(error);
    }
});

// Login Router
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ error: "Filled all details proparly" });
        }

        const userLogin = await userSchema.findOne({ email: email });

        if (userLogin) {
            const userPassword = await bcrypt.compare(
                password,
                userLogin.password
            );

            const token = await userLogin.generateAuthToken();

            const cookieOptions = {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            };

            res.cookie("token", token, cookieOptions);

            if (!userPassword) {
                res.status(400).json({ error: "Invalid credentials" });
            } else {
                res.json({ message: "User Login Successfully" });
            }
        } else {
            res.status(400).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
    }
});

router.get("/profile", authenticate, (req, res) => {
    // This route will only be accessible to authenticated users
    res.json(req.user); // req.user contains the user information
});

router.post("/logout", async (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie("token");
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
