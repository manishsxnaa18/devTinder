const mongoose = require("mongoose");

const connectDB = async () => {
    mongoose.connect(`mongodb+srv://manishsxnaa:182021@devtinder.kgodn.mongodb.net/devTinder`);
}
module.exports = connectDB;