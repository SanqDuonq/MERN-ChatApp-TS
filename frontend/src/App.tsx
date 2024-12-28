import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home"
import SignInPage from "./pages/sign-in"
import SignUpPage from "./pages/sign-up"
import ForgotPasswordPage from "./pages/fortgot-password"
import ResetPasswordPage from "./pages/reset-password"
import SettingPage from "./pages/setting"
import ProfilePage from "./pages/profile"
import { NavBarComponent } from "./components/navbar"
import { useAuthStore } from "./store/auth-store"
import { ReactNode, useEffect } from "react"
import { LoaderCircle } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { VerifyEmailPage } from "./pages/verify-email"
function App() {
    const { user, checkAuth, isLoading } = useAuthStore()

    if (!isLoading) {
        <Navigate to='/sign-in' replace />
    }

    if (!user?.isVerify) {
        <Navigate to='/verify-email' replace />
    }

    //* Redirect authenticated
    const RedirectAuthenticated = ({ children }: { children: ReactNode }) => {
        const { isLoading, user } = useAuthStore();
        if (isLoading && user) {
            <Navigate to='/'/>
        }
        return <>{children}</>
    }
    if (user && user.isVerify) {
        <Navigate to='/' />
    }
    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    if (isLoading && !user) {
        <div className="flex items-center justify-center h-screen">
            <LoaderCircle className="size-10 animate-spin text-blue-500" />
        </div>
    }

    console.log({ user })
    return (
        <>
            <div>
                <NavBarComponent />
                <Routes>
                    <Route path="/" element={user ? <HomePage /> : <Navigate to='/sign-in' />} />
                    <Route
                        path="/sign-in"
                        element = {
                            <RedirectAuthenticated>
                                <SignInPage />
                            </RedirectAuthenticated>
                        }
                    />
                    <Route path="/sign-up" element={<SignUpPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/verify-email" element = {<VerifyEmailPage/>}/>
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/settings" element={<SettingPage />} />
                    <Route path="/profile-dashboard" element={<ProfilePage />} />
                </Routes>
                <Toaster />
            </div>
        </>
    )
}

export default App
