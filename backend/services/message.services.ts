import IMessage from "../interface/message.interface";
import Message from "../models/message.model";
import { User } from "../models/user.model"
import cloudinary from "../utils/cloudinary";

export interface IMessageService {
    getUserForSidebar(id:string): Promise<void>
    getMessage(data: {senderId:string,receiverId:string}):Promise<IMessage[]>
    sendMessage(data: {senderId:string,receiverId:string,text:string,image:string}):Promise<IMessage>
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
    async sendMessage(data: { senderId: string; receiverId: string; text: string; image: string; }): Promise<IMessage> {
        let imageUrl; 
        if (data.image){
            const uploadResponse = await cloudinary.uploader.upload(data.image);
            imageUrl = uploadResponse.secure_url
        }
        const newMessage = new Message({
            senderId: data.senderId,
            receiverId: data.receiverId,
            text: data.text,
            image: imageUrl
        })
        await newMessage.save();
        return newMessage;
    }
}

export default new MessageService();