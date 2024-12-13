import { Request, Response } from "express"
import { HttpError } from "http-errors";
import authServices from "../services/auth.services";
import jwtServices from "../services/jwt.services";
class AuthController {
    async signUp(req: Request, res:Response) {
        try {
            const {email,password,fullName,profilePicture} = req.body;
            await authServices.signUp({email,password,fullName,profilePicture});
            res.status(201).json({
                message: 'User created successful'
            })
        } catch (error) {
            if (error instanceof HttpError){
                res.status(error.status).json({
                    message: error.message
                })
                return;
            }
            res.status(500).json({
                message: `Server Error ${error}`
            })
        }
    }
    async verifyEmail(req:Request, res:Response) {
        try {
            const {email,OTP} = req.body;
            await authServices.verifyEmail({email,OTP});
            res.status(200).json({
                message: 'Verify email successful'
            })
        } catch (error) {
            if (error instanceof HttpError){
                res.status(error.status).json({
                    message: error.message
                })
                return;
            }
            res.status(500).json({
                message: `Server error ${error}`
            })
        }
    }
    async signIn (req:Request,res:Response) {
        const {email,password} = req.body;
        try {
            const user = await authServices.signIn({email,password});
            const accessToken = jwtServices.generateJwt(res,{ email: user.email, userId: user.userId});
            res.status(200).json({
                message: 'Sign in successful!',
                accessToken: accessToken
            })
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.status).json({
                    message: error.message
                })
                return;
            }
            res.status(500).json({
                message: `Server error ${error}`
            })
        }
    }
    async logout(req:Request,res:Response) {
        try {
            jwtServices.clearJwt(res);
            res.status(200).json({
                message: 'Logout successful!'
            })
        } catch (error) {
            res.status(500).json({
                message: `Server error ${error}`
            })
            return;
        }
    }
    async forgotPassword(req:Request,res:Response) {
        const {email} = req.body
        try {
            await authServices.forgotPassword(email);
            res.status(200).json({
                message: `Email sent to ${email}` 
            })
        } catch (error) {
            if (error instanceof HttpError){
                res.status(error.status).json({
                    message: error.message
                })
                return;
            }
            res.status(500).json({
                message: `Server error ${error}`
            })
        }
    }
    async resetPassword (req:Request, res:Response) {
        const {OTP, newPassword} = req.body;
        try {
            await authServices.resetPassword({OTP,newPassword})
            res.status(200).json({
                message: 'Reset password successful!'
            })
        } catch (error) {
            if (error instanceof HttpError){
                res.status(error.status).json({
                    message: error.message
                })
                return;
            }
            res.status(500).json({
                message: `Server error ${error}`
            })
        }
    }
    async updateProfile(req:Request,res:Response) {
        const {profilePicture} = req.body;
        const userId = req.user!;
        try {
            await authServices.updateProfile({userId,profilePicture});
            res.status(200).json({
                message: 'Update profile successful!'
            })
        } catch (error) {
            if (error instanceof HttpError){
                res.status(error.status).json({
                    message: error.message
                })
            }
            res.status(500).json({
                message: `Server error ${error}`,
                error: error instanceof Error ? error.message : error   
            })
        }
    }
}

const authController = new AuthController();

export default authController;