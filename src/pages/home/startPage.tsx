import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Facebook, Twitter, Instagram, ArrowDownCircle } from "lucide-react"; // Import arrow icon
import Logo from "@/assets/logo.jpeg";

export default function StartPage() {
  return (
    <motion.div 
      className="h-screen w-full bg-cover bg-center text-white flex flex-col justify-between"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Header Section */}
      <motion.header 
        className="flex items-center justify-between px-6 py-4 bg-black bg-opacity-50"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Task Tracker Logo" className="h-10 w-10 rounded-lg" />
          <span className="text-xl font-semibold">Task Tracker</span>
        </div>

        {/* Sign In & Sign Up Buttons */}
        <div className="space-x-4">
          <Link to="Login">
            <Button variant="outline" className="bg-white border-white">
              Sign In
            </Button>
          </Link>
          <Link to="Signup">
            <Button className="bg-green-500 hover:bg-green-600">Sign Up</Button>
          </Link>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow bg-black bg-opacity-40 p-6">
        <motion.h1 
          className="text-4xl font-bold mb-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Welcome to Task Tracker
        </motion.h1>

        <motion.p 
          className="max-w-2xl text-center text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Task Tracker helps you <strong>organize, manage, and track</strong> your daily tasks efficiently.
          Stay productive, collaborate with your plans, and achieve your goals seamlessly!
        </motion.p>

        <motion.div 
          className="mt-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
        >
          <Link to="/signup">
            <Button className="px-6 py-3 text-lg bg-green-500 hover:bg-green-600">Get Started</Button>
          </Link>
        </motion.div>

        {/* Animated Arrow to Contact Section */}
        <motion.div 
          className="mt-10 cursor-pointer"
          initial={{ y: 0 }}
          animate={{ y: 15 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.2 }}
        >
          <ArrowDownCircle 
            size={48} 
            className="text-white hover:text-green-400 transition-all"
            onClick={() => document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" })}
          />
        </motion.div>
      </div>

      {/* Contact Us Section */}
      <motion.footer 
        id="contact-section"
        //flex items-center justify-between px-6 py-4 bg-black bg-opacity-50
        className=" bg-opacity-50 bg-black dark:bg-blue-950 text-center p-6"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
        <p className="mb-2">Have questions? Reach out to us:</p>

        <div className="flex justify-center space-x-4">
          <a href="mailto:support@tasktracker.com" className="flex items-center space-x-2 hover:text-green-400">
            <Mail size={20} /> <span>Email</span>
          </a>
          <a href="https://facebook.com/tasktracker" className="flex items-center space-x-2 hover:text-blue-500">
            <Facebook size={20} /> <span>Facebook</span>
          </a>
          <a href="https://twitter.com/tasktracker" className="flex items-center space-x-2 hover:text-blue-400">
            <Twitter size={20} /> <span>Twitter</span>
          </a>
          <a href="https://instagram.com/tasktracker" className="flex items-center space-x-2 hover:text-pink-500">
            <Instagram size={20} /> <span>Instagram</span>
          </a>
        </div>
      </motion.footer>
    </motion.div>
  );
}
