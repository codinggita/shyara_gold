const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    storeName: { type: String, required: true },
    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String
    },
    contactNumber: String,
    registrationDate: { type: Date, default: Date.now },
    businessLicenseNumber: String,
    storeType: { 
        type: String, 
        enum: ['retail', 'wholesale', 'franchise'] 
    },
    revenue: [{ 
        amount: Number, 
        date: Date 
    }],
    status: { 
        type: String, 
        enum: ['active', 'inactive'], 
        default: 'active' 
    },
    paymentStatus: { 
        type: String, 
        enum: ['paid', 'pending', 'overdue'], 
        default: 'pending' 
    },
    lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Store', storeSchema);