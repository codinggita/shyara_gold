const express = require('express');
const router = express.Router();
const { auth, roleCheck } = require('../middleware/auth');
const Store = require('../models/UserModel');

router.get('/', auth, async (req, res) => {
    try {
        const stores = await Store.find().populate('owner', 'fullName email');
        res.json(stores);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.post('/', [auth, roleCheck(['super_admin'])], async (req, res) => {
    try {
        const store = new Store(req.body);
        await store.save();
        res.json(store);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.put('/:id', [auth, roleCheck(['super_admin'])], async (req, res) => {
    try {
        const store = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(store);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.delete('/:id', [auth, roleCheck(['super_admin'])], async (req, res) => {
    try {
        await Store.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Store deleted' });
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;