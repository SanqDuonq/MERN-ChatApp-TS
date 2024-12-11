import mongoose, { Schema } from "mongoose";
import IUser from "../interface/user.interface";


const userSchema:Schema<IUser> = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
})

export const User = mongoose.model('user',userSchema);