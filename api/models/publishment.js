import mongoose from "mongoose";
const publishmentSchema= new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [{
        type: mongoose.Schema.ObjectId,
        ref: "Comment"
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
})

export const Publishment = mongoose.model("Publishment",publishmentSchema);