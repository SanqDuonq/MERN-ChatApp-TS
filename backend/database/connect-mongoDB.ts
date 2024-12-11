import mongoose from 'mongoose'
import log from '../utils/logger';
import dotenv from 'dotenv'
dotenv.config();
async function connectMongoDB(){
    try {
        const connect = await mongoose.connect(process.env.MongoURI);
        log.info(`Connected mongoDB successful: ${connect.connection.host}`)
    } catch (error) {
        log.error(`Connected mongoDB fail: ${error}`)
        process.exit(1);
    }
}

export default connectMongoDB;