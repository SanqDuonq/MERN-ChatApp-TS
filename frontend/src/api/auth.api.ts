import IUser from "../interface/user.interface"
import axiosInstance from "./axios-instance";

export const AuthAPI = {
    signIn: async (email:string,password:string): Promise<IUser> => {
        const user = await axiosInstance.post('/sign-in',{
            email,password
        })
        return user.data;
    },
    signUp: async(email:string,password:string,fullName:string,profilePicture?:string): Promise<IUser> => {
        const user = await axiosInstance.post('/sign-up', {
            email,password,fullName,profilePicture
        })
        return user.data;
    },
    logout: async():Promise<void> => {
        await axiosInstance.post('/logout')
    },
    verifyEmail: async (email:string,OTP:string): Promise<IUser> => {
        const user = await axiosInstance.post('/verify-email',{
            email,OTP
        })
        return user.data;
    },
    forgotPassword: async(email:string): Promise<void> => {
        await axiosInstance.post('/forgot-password', {
            email
        })
    },
    resetPassword: async(OTP:string,newPassword: string): Promise<void> => {
        await axiosInstance.post('/reset-password',{
            OTP,newPassword
        })
    },
    checkAuth: async (): Promise<IUser> => {
        const user = await axiosInstance.get('/checkAuth')
        return user.data;
    } 
}