import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import httpRequest from "@/api/request";
import { useNavigate } from "react-router-dom";

const VerificationPopup = ({ email, onClose }: { email: string; onClose: () => void }) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle digit input
  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Allow only digits

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to the next input if the user types a digit
    if (value && index < 5) {
      document.getElementById(`code-input-${index + 1}`)?.focus();
    }
  };

  // Handle paste event (auto-fill all 6 digits)
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");

    if (/^\d{6}$/.test(pastedText)) {
      setCode(pastedText.split(""));
    } else {
      setError("Please paste a valid 6-digit code.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join("");

    if (verificationCode.length !== 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }

    setLoading(true);
    try {
      await httpRequest.post("/auth/signup", { email, code: verificationCode });
      onClose();
      navigate("/Login");
    } catch (err) {
      setError("Invalid verification code. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="p-6 rounded-lg shadow-lg w-80 bg-white dark:bg-black">
        <h2 className="text-xl font-bold text-center mb-4">Enter Verification Code</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex space-x-2 mb-4" onPaste={handlePaste}>
            {code.map((digit, index) => (
              <Input
                key={index}
                id={`code-input-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-10 h-12 text-center text-lg border border-gray-300 dark:border-gray-600 rounded-md"
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </Button>
          <Button type="button" variant="outline" className="w-full mt-2" onClick={onClose}>Cancel</Button>
        </form>
      </div>
    </div>
  );
};

export default VerificationPopup;
