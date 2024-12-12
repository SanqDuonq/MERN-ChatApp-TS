import transporter from "../mail/mail.config";
import log from "../utils/logger";
import createErrors from 'http-errors';

class EmailService {
    async sendVerifyEmail(email:string,OTP: string) {
        try {
            await transporter.sendMail({
                from: '"MERN-ChatApp" <MERNChatApp@gmail.com>',
                to: email,
                subject: 'Verify Email',
                html: `Your OTP - ${OTP}`
            })
            log.info(`Email sent to ${email}`)
        } catch (error) {
            log.error(`Error sending email to ${email}`, error)
            throw createErrors(500, `Fail to sent email to ${email}`)
        }
    }
    async sendForgotEmail(email:string,OTP:string){
        try {
            await transporter.sendMail({
                from: '"MERN-ChatApp" <MERNChatApp@gmail.com>',
                to: email,
                subject: 'Forgot Email',
                html: `Your OTP - ${OTP}`
            })
            log.info(`Email sent to ${email}`)
        } catch (error) {
            log.error(`Error sending email to ${email}`, error)
            throw createErrors(500, `Fail to sent email to ${email}`)
        }
    }
}

export default new EmailService();