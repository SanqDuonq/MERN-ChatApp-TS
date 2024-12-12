import { Request, Response } from "express"
import { HttpError } from "http-errors";
import authServices from "../services/auth.services";

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
}

const authController = new AuthController();

export default authController;