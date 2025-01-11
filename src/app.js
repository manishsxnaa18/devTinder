const express = require("express");
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { authRouter, profileRouter, requestRouter, feedRouter, userRouter } = require('./routes');
const app = express();
require('dotenv').config();
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

        app.listen(process.env.PORT, () => {
            console.log('Port listing on port');
        });
    })
    .catch(() => {

    });
