import React, { useState } from "react"
import { useAuthStore } from "../store/useAuthStore";
import { Lock, Mail, MessageSquare, User } from "lucide-react";
import { InputComponent } from "../components/input";
import { ButtonComponent } from "../components/button";
import { Link } from 'react-router-dom';
import { signUpInput, signUpSchema } from "../schema/auth.schema";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [formErrors,setFormErrors] = useState<Partial<signUpInput>>();
    const {signUp, isSigningUp } = useAuthStore();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const result = signUpSchema.safeParse({
            body: formData
        })
        if (!result.success) {
            const errors = result.error.format();
            setFormErrors({
                fullName: errors.body?.fullName?._errors[0],
                email: errors.body?.email?._errors[0],
                password: errors.body?.password?._errors[0],
                confirmPassword: errors.body?.confirmPassword?._errors[0],
            })
            return;
        }
        signUp(formData);
    }

    return (
        <div className="min-h-screen">
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    {/*Logo*/}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div
                                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center
                                           group-hover:bg-primary/20 transition-colors"
                            >
                                <MessageSquare
                                    className="size-6 text-primary"
                                />
                            </div>
                            <p className="text-2xl font-bold mt-2 ">Create an account</p>
                            <p className="text-base-content/60">Get started with your free account</p>
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        <InputComponent
                            label="Full name"
                            type='text'
                            icon={User}
                            placeholder="Full name"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            error={formErrors?.fullName}
                        />
                        <InputComponent
                            label="Email"
                            type='text'
                            icon={Mail}
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            error={formErrors?.email}
                        />
                        <InputComponent
                            label="Password"
                            type='password'
                            icon={Lock}
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            error={formErrors?.password}
                        />
                        <InputComponent
                            label="Confirm password"
                            type='password'
                            icon={Lock}
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            error={formErrors?.confirmPassword}
                        />
                        <ButtonComponent
                            name="Sign up"
                            isLoading={isSigningUp}
                        />
                    </form>
                    <div className="text-center">
                        <p className="text-base-content/60">
                            Already have an account? {" "}
                            <Link to='/sign-in' className=" link link-primary">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage