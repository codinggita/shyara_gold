const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./config/cloudinaryConfig');
require('dotenv').config();

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

        // Check if required fields are present
        if (!name || !email || !description || !req.file) {
            return res.status(400).json({ message: "❌ Name, email, description, and image are required" });
        }

        const imageUrl = req.file.path; // Cloudinary image URL

        const newDesign = { name, email, description, imageUrl };

        await usersDesignData.insertOne(newDesign);

        res.status(201).json({ message: "✅ Design added successfully", data: newDesign });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});
