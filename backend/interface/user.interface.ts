interface IUser {
    email: string,
    fullName: string,
    password: string,
    profilePicture: string,
    isVerify: boolean,
    verifyOTP: String,
    verifyOTPExpiredAt: Date | undefined
    resetOTP: String,
    resetOTPExpiredAt: Date
}

export default IUser;