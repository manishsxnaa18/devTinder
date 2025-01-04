const express = require('express');
const User = require('../models/user');
const router = express.Router();


router.get("/feed", async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.send(allUsers);
    }
    catch (err) {
        res.status(400).send("Error not found", err.message);
    }
});

module.exports = router;