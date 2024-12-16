import { Types } from "mongoose"

interface IMessage {
    senderId: Types.ObjectId,
    receiverId: Types.ObjectId,
    text?: string,
    image?: string
}
export default IMessage