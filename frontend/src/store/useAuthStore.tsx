import {create} from 'zustand'
import { IUseAuthStore } from '../interface/auth.interface'
import { axiosInstance } from '../api/axios-instance'

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
    }
}))