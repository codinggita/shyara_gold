const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./config/cloudinaryConfig');
require('dotenv').config();

const app = express();
app.use(express.static("public"));

// CORS Setup
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? 'https://shayara-gold.onrender.com' : 'http://localhost:5173',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type',
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 4001;

// MongoDB connection details
const homeUri = process.env.HOME_MONGO_URI;

let homeDb, bestSellingItems;

// Initialize MongoDB for Home Page
async function initializeDatabase() {
    try {
        if (!homeUri) throw new Error("HOME_MONGO_URI is not set in environment variables");
        const homeClient = await MongoClient.connect(homeUri);
        console.log("Connected to Home Page MongoDB");
        homeDb = homeClient.db("home_page");
        bestSellingItems = homeDb.collection("best_selling_items");

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
}

initializeDatabase();

// Middleware
app.use(express.json());

// Fetch Best-Selling Items
app.get('/best_selling_items', async (req, res) => {
    try {
        const items = await bestSellingItems.find().toArray();
        res.status(200).json(items);
    } catch (err) {
        console.error("Error fetching items:", err);
        res.status(500).send("Error fetching items: " + err.message);
    }
});

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'best_selling_items', // Store images for best-selling items
        format: async (req, file) => 'png',
        public_id: (req, file) => file.originalname.split('.')[0],
    },
});

const upload = multer({ storage });

// Upload Best-Selling Item Image & Add Data
app.post('/best_selling_items', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const { name, price, description } = req.body;
        const imageUrl = req.file.path || req.file.secure_url; // Cloudinary URL

        // Insert into MongoDB
        const newItem = { name, price, description, imageUrl };
        const result = await bestSellingItems.insertOne(newItem);

        res.status(201).json({ message: "Best-selling item added successfully", data: result });
    } catch (err) {
        console.error("Error adding best-selling item:", err);
        res.status(500).send("Error adding best-selling item: " + err.message);
    }
});
