const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const { userAuth } = require('./middlewares/auth');
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    }
    catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }
});

app.post("/sendConnectionRequest", userAuth, async(req, res) => {
    try {
        res.send('Send connection request');
    }
    catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }
});

app.get("/user", async (req, res) => {
    const emailId = req.body.email;
    try {
        const userData = await User.findOne({email: emailId});
        res.send(userData);
    }
    catch (err) {
        res.status('404').send("user not found");
    }
});

app.get("/user/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        //await user.findById({_id: userId});
        const userData = await User.findById(userId);
        res.send(userData);
    }
    catch (err) {
        res.status(404).send("User not found");
    }
});

app.patch("/user/:id", async (req, res) => {
    const userId = req.params?.id;
    const body = req.body;
    try {
        const ALLOWED_FIELDS = ['firstName', 'lastName', 'skills', 'photoUrl'];
        const isUpdateAlowed = Object.keys(body).every((k)=> ALLOWED_FIELDS.includes(k))
        if(!isUpdateAlowed) {
          throw new Error('Update not allowed');
        }
        if((body?.skills || []).length > 10) {
            throw new Error('Skills shhould not be more then 10.');
        }
        const userUpdatedData = await User.findOneAndUpdate({_id: userId}, body, {
            returnDocument: "after",
            runValidators: true
        });
        res.send(userUpdatedData);
    }
    catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }
});

app.delete("/user/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        await User.findOneAndDelete(userId);
        res.send("User Deleted.");
    }
    catch (err) {
        res.status(400).send("Error not found", err.message);
    }
});

app.get("/feed", async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.send(allUsers);
    }
    catch (err) {
        res.status(400).send("Error not found", err.message);
    }
});

// app.use("/", (req, res) => {
//     res.send('Hello dash');
// });

// app.use("/hello", (req, res) => {
//     res.send('Hello hello');
// });

// app.use("/test", (req, res) => {
//     res.send('Hello test 78');
// });

connectDB().
    then(() => {
        console.log('Database connected');

        app.listen("7777", () => {
            console.log('Port listing on port 7777');
        });
    })
    .catch(() => {

    });
