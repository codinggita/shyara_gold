const cloudinary = require('./config/cloudinaryConfig');

cloudinary.uploader.upload("https://www.w3schools.com/w3images/lights.jpg", { folder: "test_upload" })
    .then(result => console.log("✅ Upload Success:", result.secure_url))
    .catch(error => console.error("❌ Upload Error:", error));
