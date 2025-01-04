const express = require('express');
const router = express.Router();

const { userAuth } = require('../middlewares/auth');
const { validateEditProfile } = require('../utils/validations');

router.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    }
    catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }
});

router.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        const body = req.body;
        const isUpdateAlowed = validateEditProfile(body)
        if(!isUpdateAlowed) {
          throw new Error('Update not allowed');
        }
        if((body?.skills || []).length > 10) {
            throw new Error('Skills shhould not be more then 10.');
        }
        let userUpdatedData = req.user;
        // userUpdatedData = {
        //     ...userUpdatedData,
        //     ...req.body
        // }
        Object.keys(req.body).every((k)=> userUpdatedData[k] = req.body[k]);
        console.log({userUpdatedData});
        await userUpdatedData.save();
        res.send(userUpdatedData);
    }
    catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }
});

module.exports = router;