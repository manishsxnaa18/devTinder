const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        const hasPassword = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            email,
            password: hasPassword
        });
        await user.save();
        res.send("User added successfully.");
    }
    catch (err) {
        res.status(400).send(`Error saving the user: ${err.message}`);
    }
});

router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        const userData = await User.findOne({email: email});
        if(!userData) {
            throw new Error('Invalid Credentials.');
        }
        isPasswordValid = await userData.validatePassword(password);
        
        if(!isPasswordValid){
            throw new Error('Invalid Credentials.');
        }
        const JWTToken = await userData.getJWT();
        res.cookie('token', JWTToken, {
            expires: new Date(Date.now() + 8 * 3600000), httpOnly: true
        });

        res.send("User Login Successfully.");
    }
    catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }
});

router.post("/logout", async (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()), httpOnly: true
    });

    res.send("Logout Successfully.");
});

module.exports = router;