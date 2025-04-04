import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface SuccessPopupProps {
  message: string;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number; // default 3s
}

export function SuccessPopup({
  message,
  onClose,
  autoClose = true,
  duration = 3000,
}: SuccessPopupProps) {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md">
      <Alert className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600">
        <CheckCircle className="h-5 w-5 text-green-700 dark:text-green-300" />
        <AlertTitle className="text-green-800 dark:text-green-200">Success</AlertTitle>
        <AlertDescription className="text-green-700 dark:text-green-300">
          {message}
        </AlertDescription>
        {!autoClose && (
          <div className="flex justify-end mt-2">
            <Button size="sm" variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
        )}
      </Alert>
    </div>
  );
}
