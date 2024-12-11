import express from 'express'
import authRoutes from './routes/auth.route'
import log from './utils/logger';
import connectMongoDB from './database/connect-mongoDB';
import NotFoundRoute from './middlewares/not-found-route.middleware';
const app = express();
const port = 3000


app.use(express.json());
app.use('/api/auth',authRoutes);
app.use(NotFoundRoute);

app.listen(port,() => {
    log.info(`App started at http://localhost:${port}`)
    connectMongoDB();
})