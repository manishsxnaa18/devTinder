const express = require('express');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');
const router = express.Router();
const { userAuth } = require('../middlewares/auth');

router.get("/user/request/received", userAuth, async (req, res) => {
    try {
        const { _id: loggedInUserId } = req.user;
        console.log({ loggedInUserId })
        const recevedRequests = await ConnectionRequest.find({
            toUserId: loggedInUserId,
            status: 'interested'
        }).populate("fromUserId", ['firstName', 'lastName']);

        console.log({ recevedRequests })

        res.status(200).send(recevedRequests);
    }
    catch (err) {
        res.status(400).send("Error not found", err.message);
    }
});

router.get("/user/request/send", userAuth, async (req, res) => {
    try {
        const { _id: loggedInUserId } = req.user;

        const recevedRequests = await ConnectionRequest.find({
            fromUserId: loggedInUserId,
            status: 'interested'
        }).populate("toUserId", ['firstName', 'lastName']);;

        res.status(200).send(recevedRequests);
    }
    catch (err) {
        res.status(400).send("Error not found", err.message);
    }
});

router.get("/user/connections", userAuth, async (req, res) => {
    try {
        const { _id: loggedInUserId } = req.user;

        const connections = await ConnectionRequest.find(
            {

                $or: [
                    {
                        fromUserId: loggedInUserId
                    },
                    {
                        toUserId: loggedInUserId
                    }
                ],
                status: 'accepted'
            }
        ).populate("toUserId", ['firstName', 'lastName'])
            .populate("fromUserId", ['firstName', 'lastName']);

        res.status(200).send(connections);
    }
    catch (err) {
        res.status(400).send("Error not found", err.message);
    }
});

router.get("/user/feed", userAuth, async (req, res) => {
    try {
        const { _id: loggedInUserId } = req.user;
        const page = parseInt(req.query?.page) || 1;
        const limit = parseInt(req.query?.limit) || 10;
        const skip = (page - 1) * limit;
        console.log({ page, limit, skip })
        const connections = await ConnectionRequest.find(
            {
                $or: [
                    {
                        fromUserId: loggedInUserId
                    },
                    {
                        toUserId: loggedInUserId
                    }
                ]
            }
        ).select('fromUserId toUserId');
        const hideUserFromFeed = new Set();
        (connections || []).forEach(({ fromUserId, toUserId }) => {
            hideUserFromFeed.add(fromUserId.toString());
            hideUserFromFeed.add(toUserId.toString());
        });
        const data = await User.find(
            {
                $and: [
                    { _id: { $nin: Array.from(hideUserFromFeed) } },
                    { _id: { $ne: loggedInUserId } },
                ]
            }
        ).select(['_id', 'firstName', 'lastName'])
            .skip(skip)
            .limit(limit);

        console.log({ hideUserFromFeed })

        res.status(200).send(data);
    }
    catch (err) {
        res.status(400).send("Error not found" + err.message);
    }
});

module.exports = router;