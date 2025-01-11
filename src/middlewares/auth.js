const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {

    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error('Token not valid....');
        }
        const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
        const { _id: userId } = decodedObj || {};
        if (!userId) {
            throw new Error('User not Authenticate.');
        }
        const userData = await User.findById(userId);
        if (!userData) {
            throw new Error('User not Authenticate.');
        }
        req.user = userData;
        next();
    }
    catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }
};
module.exports = {
    userAuth
}