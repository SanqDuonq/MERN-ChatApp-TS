export interface IUser {
    readonly id: string,
    isVerify?: boolean
}

export interface IAuthState {
    user: IUser | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    isError: string | null
}

export interface IAuthAction {
    signIn: (email:string,password:string) => Promise<void>
    signUp: (email:string,password:string,fullName:string,profilePicture?:string) => Promise<void>
    logout: () => Promise<void>
    verifyEmail: (email:string,OTP:string) => Promise<void>
    forgotPassword: (email:string) => Promise<void>
    resetPassword: (OTP:string,newPassword:string) => Promise<void>
    checkAuth: () => Promise<void>
}