import { User } from "../models/user.model";
import createErrors from 'http-errors';

export interface IAuthService {
    signUp(data: {email:string,password:string,fullName:string,profilePicture:string}): Promise<void>,
    signIn(data: {email:string,password:string}):Promise<void>,
    verifyEmail(data: {email:string,OTP:string}):Promise<void>,
    forgotPassword(email:string): Promise<void>,
    resetPassword(OTP:string,newPassword:string):Promise<void>
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
        await newUser.save();
    }

    async signIn(data: { email: string; password: string; }): Promise<void> {
        
    }

    async verifyEmail(data: { email: string; OTP: string; }): Promise<void> {
        
    }

    async forgotPassword(email: string): Promise<void> {
        
    }

    async resetPassword(OTP: string, newPassword: string): Promise<void> {
        
    }
}

const authServices = new AuthService();

export default authServices;