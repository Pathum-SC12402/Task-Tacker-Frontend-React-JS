import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import httpRequest from "@/api/request";
import { useNavigate } from "react-router-dom";

export function ChangePasswordForm() {
  const location = useLocation();
  const [email] = useState(location.state?.email?? "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (pwd: string) => /^[A-Za-z0-9]{6,}$/.test(pwd);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters and no special characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await httpRequest.patch("/auth/change-forgot-password", {
        email,
        newPassword: password,
      });

      if (response.data.success) {
        setSuccess(true);
        navigate("/Login");
      } else {
        setError("Failed to reset password.");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleReset} className="space-y-4 bg-white dark:bg-black p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-center">Reset Your Password</h2>

      <div className="grid gap-2">
        <Label htmlFor="new-password">New Password</Label>
        <Input
          id="new-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="confirm-password">Retype New Password</Label>
        <Input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">Password reset successfully!</p>}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );
}
