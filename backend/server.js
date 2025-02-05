const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();

// ✅ Allow frontend domain & handle CORS properly
const allowedOrigins = [
    "http://localhost:5173",
    "https://shyara-gold.onrender.com", // ✅ Replace with your deployed frontend domain when available
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

app.use(express.json()); // Middleware for JSON parsing

// MongoDB connection details
const homeUri = process.env.HOME_MONGO_URI;
const usersUri = process.env.USERS_MONGO_URI;

let homeDb, bestSellingItems, editorials;
let usersDb, usersDesignData;

// Initialize MongoDB
async function initializeDatabases() {
    try {
        const homeClient = await MongoClient.connect(homeUri);
        console.log("Connected to Home Page MongoDB");
        homeDb = homeClient.db("home_page");
        bestSellingItems = homeDb.collection("best_selling_items");
        editorials = homeDb.collection("editorials");

        const usersClient = await MongoClient.connect(usersUri);
        console.log("Connected to Users Collection MongoDB");
        usersDb = usersClient.db("users_collection");
        usersDesignData = usersDb.collection("users_design_data");

        // ✅ Start server after DB connections
        const PORT = process.env.PORT || 4001;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
}

initializeDatabases();

// ✅ Test route to check CORS headers
app.get("/test", (req, res) => {
    res.json({ message: "CORS is working!" });
});

// Routes
app.get("/users_design_data", async (req, res) => {
    try {
        const users = await usersDesignData.find().toArray();
        res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Error fetching users: " + err.message);
    }
});

app.post("/users_design_data", async (req, res) => {
    console.log("POST request received on /users_design_data");
    try {
        const newUserData = req.body;
        console.log("Received Data:", newUserData);
        const result = await usersDesignData.insertOne(newUserData);
        res.status(201).json({ message: "User data added successfully", data: result });
    } catch (err) {
        console.error("Error adding user data:", err);
        res.status(500).send("Error adding user data: " + err.message);
    }
});
