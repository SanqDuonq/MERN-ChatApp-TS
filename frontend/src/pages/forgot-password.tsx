import { Mail } from "lucide-react";
import { InputComponent } from "../components/input";
import { useState } from "react";
import { forgotInput, forgotPasswordSchema } from "../schema/auth.schema";
import { useAuthStore } from "../store/auth-store";
import { ButtonComponent } from "../components/button";

const ForgotPasswordPage = () => {
    const [formData, setFormData] = useState({
        mail: ''
    });
    const [error, setError] = useState<Partial<forgotInput>>();
    const { forgotPassword, isLoading } = useAuthStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validateForm = forgotPasswordSchema.safeParse({
            body: formData
        })
        if (!validateForm.success) {
            const typeError = validateForm.error.format();
            setError({
                email: typeError.body?.email?._errors[0]
            })
        }
        forgotPassword(formData.mail);
    }
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="w-[500px]">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 text-center border border-gray-300 p-8 rounded-lg shadow-md"
                >
                    <p className="text-2xl font-bold">Forgot Password</p>
                    <p className="text-base-content/60">Enter your email address and we'll sent OTP to your email </p>
                    <InputComponent
                        type="text"
                        placeholder="Email"
                        icon={Mail}
                        value={formData.mail}
                        onChange={(e) => setFormData({ ...formData, mail: e.target.value })}
                        error={error?.email}
                    />
                    <ButtonComponent
                        name="Submit"
                        isLoading={isLoading}
                    />
                </form>
            </div>
        </div>
    )
}

export default ForgotPasswordPage;