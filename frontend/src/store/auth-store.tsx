import { create } from 'zustand';
import { IAuthAction, IAuthState } from '../types/auth-type';
import { AuthAPI } from '../api/auth.api';
import toast from 'react-hot-toast';
import IErrorResponse from '../interface/error.interface';

export const useAuthStore = create<IAuthState & IAuthAction>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isError: null,

    //* Sign in
    signIn: async (email,password) => {
        set({isLoading: true})
        try {
            const user = await AuthAPI.signIn(email,password);
            set({isLoading: false,isAuthenticated: true,user: user})
            toast.success('Sign in successful!')
        } catch (error) {
            const typeError = error as IErrorResponse;
            set({isLoading:false, isError: typeError.response.data.message});
            toast.error(typeError.response.data.message);
        }
    },

    //* Sign up
    signUp: async(email, password, fullName, profilePicture) => {
        set({isLoading: true})
        try {
            const user = await AuthAPI.signUp(email,password,fullName,profilePicture);
            set({isLoading: false,isAuthenticated: true,user: user})
            toast.success('Sign up successful!')
        } catch (error) {
            const typeError = error as IErrorResponse;
            set({isLoading: false,isError: typeError.response.data.message});
            toast.error(typeError.response.data.message);
        }
    },

    //* Logout
    logout: async () => {
        set({isLoading: true})
        await AuthAPI.logout();
        set({isLoading: false,isAuthenticated: false,user:null});
        toast.success('Logout successful!');
    },

    //* Verify email
    verifyEmail: async (OTP,email) => {
        set({isLoading: true})
        try {
            const user = await AuthAPI.verifyEmail(email,OTP);
            set({isLoading: false,isAuthenticated:true,user: user});
            toast.success('Verify email successful!')
        } catch (error) {
            const typeError = error as IErrorResponse;
            set({isLoading: false,isError: typeError.response.data.message});
            toast.error(typeError.response.data.message);
        }
    },

    //* Forgot password
    forgotPassword: async (email) => {
        set({isLoading:true})
        try {
            await AuthAPI.forgotPassword(email);
            set({isLoading:false});
        } catch (error) {
            const typeError = error as IErrorResponse;
            set({isLoading: false,isError: typeError.response.data.message})
            toast.error(typeError.response.data.message)
        }
    },

    //* Reset password
    resetPassword: async (OTP,newPassword) => {
        set({isLoading: true})
        try {
            await AuthAPI.resetPassword(OTP,newPassword);
            set({isLoading:false})
            toast.success('Reset password successful!');
        } catch (error) {
            const typeError = error as IErrorResponse;
            set({isLoading: false, isError: typeError.response.data.message});
            toast.error(typeError.response.data.message);
        }
    },

    //* Check Authentication
    checkAuth: async () => {
        set({isLoading:true})
        try {
            const user = await AuthAPI.checkAuth();
            set({isAuthenticated: true,user: user})
        } catch (error) {
            set({user: null})
        } finally {
            set({isLoading: false})
        }
    }
}))