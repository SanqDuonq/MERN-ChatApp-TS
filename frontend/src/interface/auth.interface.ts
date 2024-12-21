import IUser from "./user.interface";

export interface IUseAuthStore extends IUseAuthMethod {
    authUser: IUser | null;
    isSigningUp: boolean;
    isLogging: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;
    isLoading: boolean;
    isError: string | null;
}

export interface IUseAuthMethod {
    checkAuth: () => Promise<void>;
    signUp: (data: {fullName: string; email: string; password: string}) => Promise<void>;
    signIn: (data: {email:string,password:string}) => Promise<void>;
    verifyEmail: (data: {OTP:string,email:string}) => Promise<void>
}

