import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import httpRequest from "@/api/request";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function UserAccount() {
  const userId = localStorage.getItem("userId");
  const authToken = localStorage.getItem("token");
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await httpRequest.get(`/data/get-userDetails/${userId}`);
        const data = response.data;
        if (response.status >= 200 && response.status < 300) {
          setName(data.name);
          setEmail(data.email);
        } else {
          setMessage(data.message || "Failed to fetch user details.");
        }
      } catch (error) {
        setMessage("An error occurred while fetching user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);


  const handleSaveChanges = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await httpRequest.put(
        `/data/update-userDetails/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        }
      );

      const data = response.data;
      if (response.status >= 200 && response.status < 300) {
        setMessage("User details updated successfully!");
      } else {
        setMessage(data.message || "Failed to update user details.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  const handleChangePassword = async () => {
    setPasswordLoading(true);
    setPasswordMessage("");

    try {
      const response = await httpRequest.patch(
        "/auth/change-password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            client: "not-browser",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setPasswordMessage("Password changed successfully!");
        setOldPassword("");
        setNewPassword("");
        // localStorage.removeItem("token");
        // sessionStorage.removeItem("token");
        // localStorage.removeItem("userId");
        // sessionStorage.removeItem("userId");
        // localStorage.removeItem("user");
        // sessionStorage.removeItem("user");

        navigate("/Dashboard", { replace: true });
        window.location.reload();
      } else {
        setPasswordMessage("Failed to change password.");
      }
    } catch (error) {
      setPasswordMessage("An error occurred. Please try again.");
    }

    setPasswordLoading(false);
  };

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            {message && <p className="text-sm text-gray-600">{message}</p>}
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveChanges} disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
            <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
                Change your password here. After saving, you'll be logged out.
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
            <div className="space-y-1 relative">
                <Label htmlFor="current">Current password</Label>
                <Input
                    id="current"
                    type={showOldPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="absolute right-3 top-9 text-gray-500"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                >
                {showOldPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
            </div>

            {/* New Password Input */}
            <div className="space-y-1 relative">
                <Label htmlFor="new">New password</Label>
                <Input
                    id="new"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="absolute right-3 top-9 text-gray-500"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                >
                {showNewPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
            </div>

            {passwordMessage && (
                <p className="text-sm text-gray-600">{passwordMessage}</p>
            )}
            </CardContent>
            <CardFooter>
            <Button onClick={handleChangePassword} disabled={passwordLoading}>
                {passwordLoading ? "Saving..." : "Save password"}
            </Button>
            </CardFooter>
        </Card>
        </TabsContent>
    </Tabs>
  );
}
