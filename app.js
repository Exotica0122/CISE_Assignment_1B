const path = require("path");
const express = require("express");
const DB = require("./config/db");
var cors = require("cors");
require("dotenv").config({ path: "./config.env" });

// routes
// TODO: Add routes for articles
const articles = require("./routes/articleRoutes");

const app = express();

// Connect Database
DB.connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

// use Routes
app.use("/api/articles", articles);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("API Running");
    });
}

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
