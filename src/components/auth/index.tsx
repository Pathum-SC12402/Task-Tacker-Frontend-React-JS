import { Route, Routes } from "react-router-dom";
import { LoginForm } from "./components/loginForm"
import { SignUpForm } from "./components/signupForm"

export default function PlansPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Routes>
          <Route path="Login" element={<LoginForm />} />
          <Route path="Signup" element={<SignUpForm />} />
        </Routes>
      </div>
    </div>
  )
}
