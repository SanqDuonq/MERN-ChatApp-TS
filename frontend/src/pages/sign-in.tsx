import { Lock, Mail, MessageSquare } from "lucide-react";
import { InputComponent } from "../components/input";
import { useState } from "react";
import { ButtonComponent } from "../components/button";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth-store";
import { signInSchema, signInInput } from '../schema/auth.schema';

const SignInPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [formErrors, setFormErrors] = useState<Partial<signInInput>>();
    const {signIn,isLoading} = useAuthStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const result = signInSchema.safeParse({
            body: formData
        })
        if (!result.success) {
            const errors = result.error.format();
            setFormErrors({
                email: errors.body?.email?._errors[0],
                password: errors.body?.password?._errors[0]
            })
            return;
        }
        signIn(formData.email,formData.password);
    }

    return (
        <div className="min-h-screen">
            <div className="flex flex-col items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center mb-8">
                        {/*Logo*/}
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <MessageSquare
                                    className="size-6 text-primary"
                                />
                            </div>
                            <p className="text-2xl font-bold mt-2">Welcome Back</p>
                            <p className="text-base-content/60">Sign in your account</p>
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        <InputComponent
                            label="Email"
                            type="text"
                            placeholder="Email"
                            icon={Mail}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            error={formErrors?.email}
                        />
                        <InputComponent
                            label="Password"
                            type="password"
                            placeholder="Password"
                            icon={Lock}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            error={formErrors?.password}
                        />
                        <p className="flex justify-end cursor-pointer hover:underline">
                            <Link to='/forgot-password'>
                                Forgot password?
                            </Link>
                        </p>
                        <ButtonComponent
                            name="Sign in"
                            isLoading={isLoading}
                        />
                    </form>
                    <div className="text-center">
                        <p
                            className="text-base-content/60"
                        >
                            Don't have an account? {" "}
                            <Link to='/sign-up' className="link link-primary">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInPage;