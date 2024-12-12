class OTPService {
    generateOTP(): {OTP:string,OTPExpiredAt:Date} {
        const OTP = Math.floor(100000 + Math.random() * 900000).toString();
        const OTPExpiredAt = new Date(Date.now() + 1000 * 60 * 30);
        return {OTP,OTPExpiredAt};
    }
}

export default new OTPService();