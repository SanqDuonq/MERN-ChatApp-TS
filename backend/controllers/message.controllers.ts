import { Request,Response } from "express";
import messageServices from "../services/message.services";
import { HttpError } from 'http-errors';

class MessageController {
    async getUserForSidebar (req:Request,res: Response) {
        const userId = req.user;
        try {
            const user = await messageServices.getUserForSidebar(userId!)
            res.status(200).json({
                message: 'Get user successful!',
                data: user
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
    async getMessages (req: Request, res: Response) {
        const {id:userToChatId} = req.params;
        const myId = req.user
        try {
            const message = await messageServices.getMessage({
                senderId: myId!,
                receiverId: userToChatId
            })
            res.status(200).json({
                message
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
}

export default new MessageController();
