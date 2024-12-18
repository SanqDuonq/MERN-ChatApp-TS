export interface IUseAuthStore extends IUseAuthMethod {
  authUser: null;
  isSigningUp: boolean;
  isLogging: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
}

export interface IUseAuthMethod {
  checkAuth: () => Promise<void>;
  signUp: (data: {
    fullName: string;
    email: string;
    password: string;
  }) => Promise<void>;
}
