import { Request,Response,NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv'
import log from "../utils/logger";
dotenv.config();

function verifyToken(req:Request,res:Response,next:NextFunction) {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            res.status(401).json({
                message: 'Unauthorized - no token provided'
            })
            return;
        }
        const decode = jwt.verify(accessToken,process.env.JWT_SECRET) as JwtPayload
        req.user = decode.userId
        next();
    } catch (error) {
        log.error(`Error in verify token ${error}`);
        res.status(403).json({
            message: 'Forbidden - invalid or expired token'
        })
        return;
    }
}

export default {
    verifyToken
};