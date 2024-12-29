import { Navigate, Route, Routes } from "react-router-dom"
import SignInPage from "./pages/sign-in"
import SignUpPage from "./pages/sign-up"
import ForgotPasswordPage from "./pages/forgot-password"
import ResetPasswordPage from "./pages/reset-password"
import SettingPage from "./pages/setting"
import ProfilePage from "./pages/profile"
import { NavBarComponent } from "./components/navbar"
import { useAuthStore } from "./store/auth-store"
import { ReactNode, useEffect } from "react"
import { Toaster } from 'react-hot-toast'
import { VerifyEmailPage } from "./pages/verify-email"
import LoadingSpinner from "./components/loading-spinner"
import HomePage from "./pages/home"

//* Protect routes
const ProtectRoutes = ({ children }: { children: ReactNode }) => {
    const { user, isAuthenticated } = useAuthStore();
    if (!isAuthenticated) {
        return <Navigate to='/sign-in' replace />
    }
    if (!user?.user.isVerify) {
        return <Navigate to='/verify-email' replace />
    }
    return <>{children}</>
}

//* Redirect authenticated
const RedirectAuthenticated = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, user } = useAuthStore();
    if (isAuthenticated && user?.user.isVerify) {
        return <Navigate to='/' replace/>
    }
    return <>{children}</>
}

function App() {
    const {checkAuth,isLoading,isAuthenticated,user} = useAuthStore();
    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    if (isLoading) return <LoadingSpinner/>
    console.log({isAuthenticated,user})
    return (
        <>
            <div>
                <NavBarComponent />
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <ProtectRoutes>
                                <HomePage/>
                            </ProtectRoutes>
                        }
                    />
                    <Route
                        path="/sign-in"
                        element={
                            <RedirectAuthenticated>
                                <SignInPage />
                            </RedirectAuthenticated>
                        }
                    />
                    <Route 
                        path="/sign-up" 
                        element={
                            <RedirectAuthenticated>
                                <SignUpPage/>
                            </RedirectAuthenticated>
                        } 
                    />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/verify-email" element={<VerifyEmailPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route 
                        path="/settings" 
                        element={
                            <ProtectRoutes>
                                <SettingPage />
                            </ProtectRoutes>
                        } 
                    />
                    <Route 
                        path="/profile-dashboard" 
                        element={
                            <ProtectRoutes>
                                <ProfilePage />
                            </ProtectRoutes>
                        } 
                    />
                </Routes>
                <Toaster />
            </div>
        </>
    )
}

export default App
