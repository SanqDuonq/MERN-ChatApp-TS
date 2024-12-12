import mongoose, { MongooseError, Schema } from "mongoose";
import IUser from "../interface/user.interface";
import bcryptjs from 'bcryptjs'
import log from "../utils/logger";

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
    },
    isVerify: {
        type: Boolean,
        default: false
    },
    verifyOTP: {
        type: String,
        default: ''
    },
    verifyOTPExpiredAt: {
        type: Date
    },
    resetOTP: {
        type: String,
        default: ''
    },
    resetOTPExpiredAt: {
        type: Date
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function (next){
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const hash = await bcryptjs.hash(this.password,10);
        this.password = hash;
        next();
    } catch (error) {
        log.error(error,'Fail to hash password');
        next(error as MongooseError)
    }
})

export const User = mongoose.model('user',userSchema);