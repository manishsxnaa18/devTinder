const express = require('express');
const router = express.Router();
const { userAuth } = require('../middlewares/auth');
const User = require('../models/user');
const Connection = require('../models/connectionRequest');
const { validateReviewConnectionStatus, validateSendConnectionStatus } = require('../utils/validations');

router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {

        const toUserId = req.params?.toUserId;
        const status = req.params?.status;
        const { _id: fromUserId } = req.user;
        console.log({
            toUserId,
            status,
            fromUserId
        })
        const isValidStatus = validateSendConnectionStatus(status);
        if (!isValidStatus) {
            throw new Error('Not a valid status');
        }
        const toUserData = await User.findById(toUserId);
        if (!toUserData) {
            throw new Error('User not found.');
        }
        const isConnectionRequestExists = await Connection.findOne(
            {
                $or: [
                    {
                        fromUserId: toUserId,
                        toUserId: fromUserId
                    },
                    {
                        fromUserId: fromUserId,
                        toUserId: toUserId
                    }
                ]
            }
        );
        if (isConnectionRequestExists) {
            throw new Error('Request already send.');
        }
        console.log({ status, toUserId })
        const connection = new Connection({
            fromUserId,
            toUserId: toUserData._id,
            status
        });
        await connection.save();

        res.json({
            message: 'Request send successfully.',
            data: connection
        });
    }
    catch (err) {
        console.log({ err })
        res.statusCode(400).send(`Error: ${err.message}`);
    }
});

router.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const requestId = req.params?.requestId;
        const status = req.params?.status;
        const { _id: loggedInUserId } = req.user;
        const isValidStatus = validateReviewConnectionStatus(status);
        if (!isValidStatus) {
            throw new Error('Not a valid status');
        }
        let connectionRequest = await Connection.findOne(
            {
                _id: requestId,
                toUserId: loggedInUserId,
                status: 'interested'
            }
        );

        if (!connectionRequest) {
            return res.statusCode(404).json({
                message: `Request not a valid.`
            });
        }

        connectionRequest.status = status;

        await connectionRequest.save();

        res.json({
            message: `Request has been ${status}.`,
            data: connectionRequest
        });
    }
    catch (err) {
        res.statusCode(400).send(`Error: ${err.message}`);
    }
});

module.exports = router;