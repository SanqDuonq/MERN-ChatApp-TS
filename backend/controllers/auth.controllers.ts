import { Request, Response } from "express"

const signup = (req:Request,res:Response) => {
    const body = req.body;
    try {
        
    } catch (error) {
        
    }
}


const login = (req:Request,res:Response) => {
    res.send('Sign up routes')
}
const logout = (req:Request,res:Response) => {
    res.send('Sign up routes')
}

export default {
    signup,
    login,
    logout
}