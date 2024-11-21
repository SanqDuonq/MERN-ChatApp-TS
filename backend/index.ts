import express from 'express'
import authRoutes from './routes/auth.route'
const app = express();
const port = 3000

app.use('/api/auth',authRoutes)
app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})