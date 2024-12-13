import { Response } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

class JwtService {
    generateJwt(res:Response,user: {email:string,userId:string}) {
        const payload = {
            email: user.email,
            userId: user.userId
        }
        const accessToken = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: '2h'});        
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 1000 * 60  * 60 * 2
        })   
        return accessToken;
    }
    clearJwt(res:Response){
        res.clearCookie('accessToken',{
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict'
        })
    }
}

export default new JwtService();