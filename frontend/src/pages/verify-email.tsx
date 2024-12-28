import { Mail } from "lucide-react"
import { OTPInputComponent } from "../components/otp-input"
import { ButtonComponent } from "../components/button"
import { useAuthStore } from "../store/auth-store"

export const VerifyEmailPage = () => {
    const {verifyEmail,isLoading} = useAuthStore();

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="flex flex-col items-center border rounded-lg w-[480px] py-8 shadow-md space-y-[10px]">
                    <div className="size-16 bg-emerald-700 flex items-center justify-center mx-auto rounded-full ">
                        <Mail className="size-8 text-white" />
                    </div>
                    <p className="text-4xl font-bold text-center">Verify Email</p>
                    <p className="text-md font-medium">Enter OTP sent to </p>
                    <div>
                        <OTPInputComponent
                            length={6}
                            onOTPSubmit={verifyEmail()}
                        />
                        <ButtonComponent
                            name="Submit"
                            isLoading={isLoading}
                        />
                        <p className="text-center hover:underline cursor-pointer">Resend code</p>
                    </div>
                </div>
            </div>
        </>
    )
}