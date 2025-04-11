import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import httpRequest from "@/api/request";
import FpVerification from "./fpVerification";

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showVerification, setShowVerification] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
  
    try {
      const response = await httpRequest.post("/auth/signin", {
        email,
        password,
      });
  
      const data = response.data;
  
      if (data.success) {
        alert(data.message);
        localStorage.setItem("token", data.token);

        const userResponse = await httpRequest.get(`/data/getUserId?email=${email}`);
            if (userResponse.status !== 200) {
                throw new Error("Failed to fetch user ID");
            }
            const userData = userResponse.data;
            const userId = userData.userId;

            localStorage.setItem("userId", userId);
            const userDetails = await httpRequest.get(`/data/get-userRole/${userId}`);
            if (userDetails.status !== 200) {
              throw new Error("Failed to fetch user details");
            }else{
              const userDetailsData = userDetails.data;
              if(userDetailsData.role === "admin"){
                navigate("/Admin_Dashboard");
              }else if(userDetailsData.role === "user"){
                navigate("/Dashboard/");
              }
            }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleForgotPassword = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  
    if (!email) {
      setError("Please enter your email first.");
      return;
    }
  
    try {
      const response = await httpRequest.patch("/auth/send-verification-code", { email });
  
      if (response.status === 200) {
        setShowVerification(true);
      } else {
        setError("Failed to send verification code. Try again.");
      }
    } catch (err) {
      setError("Error sending verification code.");
    }
  };  
  

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    onClick={handleForgotPassword}
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      {showVerification && <FpVerification email={email} onClose={() => setShowVerification(false)} />}
    </div>
  );
}
