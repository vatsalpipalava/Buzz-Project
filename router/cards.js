const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");

require("../database/connection");

const cardSchema = require("../model/cardSchema");
const { updateOne } = require("../model/userSchema");

router.post("/api/cards", authenticate, async (req, res) => {
    try {
        const cardData = req.body;
        const card = new cardSchema(cardData); // Directly use parsed JSON

        const savedCard = await card.save();

        res.status(201).json({
            message: "Card created successfully",
            card: savedCard,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create card" });
    }
});

router.get("/api/my-themes", authenticate, async (req, res) => {
    try {
        // Find themes created by the logged-in user
        const themes = await cardSchema.find({ userid: req.user._id });
        res.json(themes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get a theme by its ID
router.get("/api/my-themes/:themeId", authenticate, async (req, res) => {
    try {
        const themeId = req.params.themeId;
        const userId = req.user._id;

        // Find the theme by themeId and userid
        const theme = await cardSchema.findOne({
            userid: userId,
            _id: themeId,
        });

        if (!theme) {
            return res.status(404).json({ error: "Theme not found" });
        }

        res.json(theme);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Edit a theme by its ID
// router.put("/api/my-themes/:themeId", authenticate, async (req, res) => {
//     try {
//         const themeId = req.params.themeId;
//         const userId = req.user._id;

//         const updatedData = req.body;

//         const updatedTheme = await cardSchema.findOneAndUpdate(
//             { _id: themeId, userid: userId },
//             updatedData,
//             { new: true }
//         );

//         if (!updatedTheme) {
//             return res
//                 .status(404)
//                 .json({
//                     error: "Theme not found or you are not authorized to edit this theme",
//                 });
//         }

//         res.json(updatedTheme);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });
router.put("/api/my-themes/:themeId", authenticate, async (req, res) => {
    try {
        const themeId = req.params.themeId;
        const userId = req.user._id;

        const updatedData = req.body;

        const updatedTheme = await cardSchema.findOneAndUpdate(
            { _id: themeId, userid: userId },
            updatedData,
            { new: true }
        );

        if (!updatedTheme) {
            return res
                .status(404)
                .json({
                    error: "Theme not found or you are not authorized to edit this theme",
                });
        }

        // Print successful message after edit
        res.json({ 
            message: "Theme Updated successfully",
            theme: updatedTheme 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
