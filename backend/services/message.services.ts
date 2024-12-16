import IMessage from "../interface/message.interface";
import Message from "../models/message.model";
import { User } from "../models/user.model"

export interface IMessageService {
    getUserForSidebar(id:string): Promise<void>
    getMessage(data: {senderId:string,receiverId:string}):Promise<IMessage[]>
}

class MessageService implements IMessageService {
    async getUserForSidebar(id:string): Promise<void> {
        await User.find({_id: id}).select('-password');
    }
    async getMessage(data: { senderId: string, receiverId: string; }): Promise<IMessage[]> {
        const message = await Message.find({
            $or: [
                {
                    senderId: data.senderId,
                    receiverId: data.receiverId
                },
                {
                    senderId: data.receiverId,
                    receiverId: data.senderId
                }
            ]
        }).lean<IMessage[]>()
        return message
    }  
    
}

export default new MessageService();