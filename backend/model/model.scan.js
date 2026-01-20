import mongoose from "mongoose";
const { Schema } = mongoose;

const scanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true // NOT unique
    },
    url: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    score: {
        type: Number
    },
    issues: {
        type: [String],
        default: []
    },
    signals: {
        type: Object
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    completedAt: {
        type: Date
    }
})
export const Scan = mongoose.model('Scan', scanSchema);