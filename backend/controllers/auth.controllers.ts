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
    
}

const authController = new AuthController();

export default authController;