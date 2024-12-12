import { User } from "../models/user.model";
import createErrors from 'http-errors';
import otpServices from "./otp.services";
import emailServices from "./email.services";
import { PassThrough } from "nodemailer/lib/xoauth2";

export interface IAuthService {
    signUp(data: {email:string,password:string,fullName:string,profilePicture:string}): Promise<void>,
    signIn(data: {email:string,password:string}):Promise<void>,
    verifyEmail(data: {email:string,OTP:string}):Promise<void>,
    forgotPassword(email:string): Promise<void>,
    resetPassword(data:{OTP:string,newPassword:string}):Promise<void>,
}

export class AuthService implements IAuthService {
    async signUp(data: { email: string; password: string; fullName: string; profilePicture: string; }): Promise<void> {
        const body = data;
        const user = await User.findOne({email: body.email});
        if (user) {
            throw createErrors(409, 'Email already exists');
        }
        const newUser = new User({
            email: body.email,
            password: body.password,
            fullName: body.fullName,
            profilePicture: body.profilePicture
        })
        const {OTP,OTPExpiredAt} = otpServices.generateOTP();
        newUser.verifyOTP = OTP;
        newUser.verifyOTPExpiredAt = OTPExpiredAt;
        emailServices.sendVerifyEmail(body.email,OTP);
        await newUser.save();
    }

    async signIn(data: { email: string; password: string; }): Promise<void> {
        const body = data;
        const user = await User.findOne({email: body.email})
        if (!user) {
            throw createErrors(404, 'Email not exists');
        }
        const isPassword = await user.verifyPassword(body.password);
        if (!isPassword){
            throw createErrors(400, 'Email or password is wrong!')
        }
    }

    async verifyEmail(data: { email: string; OTP: string; }): Promise<void> {
        const body = data;
        const user = await User.findOne({email: body.email})
        if (!user) {
            throw createErrors(404, 'Email not found!')
        }
        if (user.verifyOTP !== body.OTP) {
            throw createErrors(400, 'Wrong OTP!')
        }
        const now = new Date();
        if (!user.verifyOTPExpiredAt || user.verifyOTPExpiredAt < now ){
            throw createErrors(400, 'OTP is expired!')
        }
        user.isVerify = true;
        await user.save();
    }

    async forgotPassword(email: string): Promise<void> {
        const user = await User.findOne({email});
        if (!user) {
            throw createErrors(404, 'Email not exists!');
        }        
        const {OTP,OTPExpiredAt} = otpServices.generateOTP();
        user.resetOTP = OTP;
        user.resetOTPExpiredAt = OTPExpiredAt;
        emailServices.sendForgotEmail(email,OTP);
        await user.save();
    }

    async resetPassword(data: {OTP: string, newPassword: string}): Promise<void> {
        const {OTP,newPassword} = data
        const user = await User.findOne({
            resetOTP: OTP
        })
        if (!user){
            throw createErrors(404, 'OTP Wrong!')
        }
        if (user.resetOTPExpiredAt < new Date()){
            throw createErrors(400, 'OTP is expired!')
        }
        user.password = newPassword;
        await user.verifyPassword(newPassword);

        await user.save();
    }
}

const authServices = new AuthService();

export default authServices;