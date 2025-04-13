import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { useEffect } from "react";

export default function ContactUsPage() {
    useEffect(() => {
        document.body.style.overflow = "hidden"; 

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="flex justify-center items-center bg-background p-4">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-muted-foreground">
                        Task Tracker helps you organize, manage, and track your daily tasks efficiently. 
                        Stay productive, collaborate with your plans, and achieve your goals seamlessly!
                    </p>
                    <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-2">
                            <Mail className="w-5 h-5" />
                            <span>task.tracker.sl@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="w-5 h-5" />
                            <span>+1 234 567 890</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            <span>Kalutara, Sri Lanka</span>
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-muted-foreground">Follow us:</p>
                        <div className="flex justify-center gap-4 mt-2">
                            <Facebook className="w-6 h-6 cursor-pointer" />
                            <Twitter className="w-6 h-6 cursor-pointer" />
                            <Instagram className="w-6 h-6 cursor-pointer" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
