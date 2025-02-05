const express = require('express');
const { MongoClient } = require('mongodb');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const BASE_URL = process.env.BASE_URL || 'https://shayara-gold.onrender.com';
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ MONGO_URI is missing in environment variables.");
    process.exit(1);
}

// Fix CORS issue by allowing localhost + Render frontend
app.use(cors({
    origin: ['http://localhost:5174', 'http://localhost:5175', 'https://shayara-gold.onrender.com'],
    methods: ['GET', 'POST'],
    credentials: true,
}));

// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const isValidType = filetypes.test(file.mimetype) && filetypes.test(path.extname(file.originalname).toLowerCase());
        cb(null, isValidType);
    }
});

// MongoDB Connection
let db, usersDesignData;

async function connectToDatabase() {
    try {
        const client = await MongoClient.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        db = client.db('shyaragold');
        usersDesignData = db.collection('users_design_data');
        console.log('✅ Connected to MongoDB');

        // Start the server after DB connection is successful
        const PORT = process.env.PORT || 3002;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on ${BASE_URL}`);
        });
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        process.exit(1); // Stop execution if DB connection fails
    }
}

connectToDatabase();

// POST route to add new jewelry design
app.post('/users_design_data', upload.single('image'), async (req, res) => {
    try {
        if (!usersDesignData) {
            return res.status(500).json({ message: "Database not initialized" });
        }

        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            material: req.body.material,
            style: req.body.style,
            goldType: req.body.goldType,
            imageUrl: req.file ? `${BASE_URL}/uploads/${req.file.filename}` : null,
            createdAt: new Date(),
        };

        await usersDesignData.insertOne(newUserData);
        res.status(201).json({ message: "Design submitted successfully", data: newUserData });
    } catch (err) {
        console.error("❌ Error adding design:", err);
        res.status(500).json({ message: "Error adding design", error: err.message });
    }
});

// GET route to fetch all jewelry designs
app.get('/users_design_data', async (req, res) => {
    try {
        if (!usersDesignData) {
            return res.status(500).json({ message: "Database not initialized" });
        }

        const designs = await usersDesignData.find().toArray();
        res.json(designs);
    } catch (err) {
        console.error("❌ Error fetching designs:", err);
        res.status(500).json({ message: "Error fetching designs", error: err.message });
    }
});
