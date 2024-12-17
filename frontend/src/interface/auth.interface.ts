export interface IUseAuthStore extends IUseAuthMethod {
    authUser: null,
    isSigningUp: boolean,
    isLogging: boolean,
    isUpdatingProfile: boolean,
    isCheckingAuth: boolean
}

export interface IUseAuthMethod {
    checkAuth: () => Promise<void>
}
