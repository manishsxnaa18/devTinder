const authRouter = require('./auth');
const profileRouter = require('./profile');
const requestRouter = require('./request');
const feedRouter = require('./feed');
const userRouter = require('./user');

module.exports = {
    authRouter,
    profileRouter,
    requestRouter,
    feedRouter,
    userRouter
}