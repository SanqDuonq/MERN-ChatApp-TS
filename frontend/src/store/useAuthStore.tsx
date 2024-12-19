import {create} from 'zustand'
import { IUseAuthStore } from '../interface/auth.interface'
import { axiosInstance } from '../api/axios-instance'
import toast from 'react-hot-toast'

export const useAuthStore = create<IUseAuthStore>((set) => ({
    authUser: null,
    isSigningUp: false,
    isLogging: false,
    isUpdatingProfile: false,
    isCheckingAuth: false,

    //* Check authentication
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/checkAuth')
            set({authUser: res.data.user});
        } catch (error) {
            set({authUser: null})
        } finally {
            set({isCheckingAuth: false})
        }
    },

    //* Sign up
    signUp: async (data) => {
        set({isSigningUp: true})
        try {
            const res = await axiosInstance.post('/sign-up',data)
            set({authUser: res.data})
            toast.success('Sign up successful!')
        } catch (error) {
            toast.error('Fail to sign up')
        } finally {
            set({isSigningUp: false})
        }
    },

    //* Sign in 
    signIn: async (data) => {
        set({isLogging: true})
        try {
            const res = await axiosInstance.post('/sign-in',data)
            toast.success('Sign in successful!')
        } catch (error) {
            
        }
    }
}))