const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 50
    },
    lastName: {
        type: String,
        trim: true,
        maxLength: 50
    },
    emailId: {
        type: String,
        required: [true, 'Email is required'], // Ensure email is provided
        trim: true, // Remove any extra spaces
        lowercase: true, // Convert to lowercase for consistency
        // match: [
        //     /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        //     'Please provide a valid email address' // Custom error message
        // ],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Please provide a valid email address.');
            }
        },
        unique: true,
        //index: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('Password should be strong.');
            }
        }
    },
    gender: {
        type: String,
        // validate(value) {
        //     if (!['male', 'female', 'others'].includes(value)) {
        //         throw new Error('Gender data is not valid.');
        //     }
        // },
        enum: ['male', 'female', 'others']
    },
    age: {
        type: Number,
        trim: true,
        min: 18
    },
    about: {
        type: String,
        trim: true,
        default: 'write something about you'
    },
    photoUrl: {
        type: String,
        trim: true,
        default: function () {
            // Conditional default value based on gender
            if (this.gender === 'male') {
                return 'https://randomuser.me/api/portraits/men/1.jpg'; // Male default photo
            } else if (this.gender === 'female') {
                return 'https://randomuser.me/api/portraits/women/1.jpg'; // Female default photo
            }
            return 'https://randomuser.me/api/portraits/lego/1.jpg'; // Fallback for other cases
        },
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error('Please provide a valid Url.');
            }
        }
    },
    skills: {
        type: [String]
    }
}, {
    timestamps: true,
    // timestamps: {
    //     createdAt: 'created_at', // Use `created_at` to store the created date
    //     updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    // }
});

userSchema.index({ firstName: 1, lastName: 1 });
userSchema.index({ gender: 1 });
userSchema.index({ age: 1 });

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, 'testing@#$', {
        expiresIn: "1d"
    });
    return token;
}

userSchema.methods.validatePassword = async function (password) {
    const user = this;

    isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid;
}

const User = mongoose.model("User", userSchema);

module.exports = User;