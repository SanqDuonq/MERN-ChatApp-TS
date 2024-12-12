import express from 'express'
import authRoutes from './routes/auth.route'
import cookieParser from 'cookie-parser'
import log from './utils/logger';
import connectMongoDB from './database/connect-mongoDB';
import NotFoundRoute from './middlewares/not-found-route.middleware';
import dotenv from 'dotenv'
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRoutes);
app.use(NotFoundRoute);

app.listen(port,() => {
    log.info(`App started at http://localhost:${port}`)
    connectMongoDB();
})