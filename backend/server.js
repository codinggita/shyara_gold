const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./config/cloudinaryConfig');
const connectUserDB = require('./.config/mongoDB.config');
require('dotenv').config();

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Fixed: Cleaned up CORS configuration
app.use(cors({
    origin: ["http://localhost:5173", "https://shyara-gold.netlify.app"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

const PORT = process.env.PORT || 4001;

const homeUri = process.env.HOME_MONGO_URI;
const usersUri = process.env.USERS_MONGO_URI;

let homeDb, bestSellingItems;
let usersDb, usersDesignData;

connectUserDB()

async function initializeDatabase() {
    try {
        if (!homeUri || !usersUri) throw new Error("MongoDB URIs are not set in environment variables");

        const homeClient = new MongoClient(homeUri);
        await homeClient.connect();
        homeDb = homeClient.db("home_page");
        bestSellingItems = homeDb.collection("best_selling_items");

        const usersClient = new MongoClient(usersUri);
        await usersClient.connect();
        usersDb = usersClient.db("users_collection");
        usersDesignData = usersDb.collection("users_design_data");

        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err);
        process.exit(1);
    }
}
initializeDatabase();

app.get('/users_design_data', async (req, res) => {
    try {
        if (!usersDesignData) {
            return res.status(500).json({ message: "Database not initialized yet" });
        }

        const designs = await usersDesignData.find({}).toArray();
        res.status(200).json(designs);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

// ✅ Fixed: Added missing route for `/best_selling_items`
app.get('/best_selling_items', async (req, res) => {
    try {
        if (!bestSellingItems) {
            return res.status(500).json({ message: "Database not initialized yet" });
        }

        const items = await bestSellingItems.find({}).toArray();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

// ✅ Image Upload to Cloudinary
const userDesignStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'users_design_data',
        format: async () => 'png',
        public_id: (req, file) => file.originalname.split('.')[0],
    },
});
const userDesignUpload = multer({ storage: userDesignStorage });

app.post('/users_design_data/upload', userDesignUpload.single('image'), async (req, res) => {
    try {
        const { name, email, description } = req.body;

        if (!name || !email || !description || !req.file) {
            return res.status(400).json({ message: "❌ Name, email, description, and image are required" });
        }

        const imageUrl = req.file.path;
        const newDesign = { name, email, description, imageUrl };

        await usersDesignData.insertOne(newDesign);

        res.status(201).json({ message: "✅ Design added successfully", data: newDesign });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});
