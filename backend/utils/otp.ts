const OTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const OTPExpiredAt = () => {
    return new Date(Date.now() + 1000 * 60 * 30)
}

export default {
    OTP,
    OTPExpiredAt
}