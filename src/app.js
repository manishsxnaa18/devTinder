const express = require("express");
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { authRouter, profileRouter, requestRouter, feedRouter, userRouter } = require('./routes');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", feedRouter);
app.use("/", userRouter);

connectDB().
    then(() => {
        console.log('Database connected');

        app.listen("7777", () => {
            console.log('Port listing on port 7777');
        });
    })
    .catch(() => {

    });
