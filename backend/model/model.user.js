import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    plan: {
        type: String,
        enum: ["free", "basic", "pro"],
        default:"free"
    },
    planExpiresAt: {
        type: Date,
        default: null
    }
})
export const User = mongoose.model('User', userSchema);