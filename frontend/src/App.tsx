import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/home"
import SignInPage from "./pages/sign-in"
import SignUpPage from "./pages/sign-up"
import ForgotPasswordPage from "./pages/fortgot-password"
import ResetPasswordPage from "./pages/reset-password"
import SettingPage from "./pages/setting"
import ProfilePage from "./pages/profile"

function App() {

  return (
    <>
      <Routes>
         <Route path="/" element = {<HomePage/>} />
         <Route path="/sign-in" element = {<SignInPage/>} />
         <Route path="/sign-up" element = {<SignUpPage/>} />
         <Route path="/forgot-password" element = {<ForgotPasswordPage/>} />
         <Route path="/reset-password" element = {<ResetPasswordPage/>} />
         <Route path="/settings" element = {<SettingPage/>} />
         <Route path="/profile-dashboard" element = {<ProfilePage/>} />
      </Routes>
    </>
  )
}

export default App
