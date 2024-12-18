import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home"
import SignInPage from "./pages/sign-in"
import SignUpPage from "./pages/sign-up"
import ForgotPasswordPage from "./pages/fortgot-password"
import ResetPasswordPage from "./pages/reset-password"
import SettingPage from "./pages/setting"
import ProfilePage from "./pages/profile"
import { NavBarComponent } from "./components/navbar"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { LoaderCircle } from 'lucide-react'
import {Toaster} from 'react-hot-toast'
function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])
                        
  if (isCheckingAuth && !authUser) {
    <div className="flex items-center justify-center h-screen">
      <LoaderCircle className="size-10 animate-spin  text-blue-500" />
    </div>
  }

  console.log({ authUser })
  return (
    <>
      <div>
        <NavBarComponent />
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to='/sign-in'/>}/>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/settings" element={<SettingPage />} />
          <Route path="/profile-dashboard" element={<ProfilePage />} />
        </Routes>
        <Toaster/>
      </div>
    </>
  )
}

export default App
