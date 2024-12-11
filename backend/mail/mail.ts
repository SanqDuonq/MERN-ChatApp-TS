import log from "../utils/logger";
import OTP from "../utils/otp";
import transporter from "./mail.config";
import createErrors from 'http-errors'
export async function sendVerifyEmail(email:string) {
    const otp = OTP.OTP();
    try {
        await transporter.sendMail({
            from: '"MERN-ChatApp" <MERNChatApp@gmail.com>',
            to: email,
            subject: 'Verify Email',
            html: `Your OTP - ${otp}`
        })
        log.info(`Email sent to ${email}`)
    } catch (error) {
        log.error(`Error sending email to ${email}`, error)
        throw createErrors(500, `Fail to sent email to ${email}`)
    }
}