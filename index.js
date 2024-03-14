const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require('path'); // Import the path module

const app = express();
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));

app.use(cors());

dotenv.config({ path: "./config.env" });
require("./database/connection");

app.use(require("./router/auth"));
app.use(require("./router/cards"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});