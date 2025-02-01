import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

function SignIn({ onSwitchToSignUp }) {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError("All fields are mandatory!");
            return;
        }

        setError("");

        try {
            const response = await fetch("http://localhost:8000/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Invalid credentials!");
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);

            // Fetch userId
            const userResponse = await fetch(`http://localhost:8000/api/data/getUserId?email=${formData.email}`);
            if (!userResponse.ok) {
                throw new Error("Failed to fetch user ID");
            }
            const userData = await userResponse.json();
            const userId = userData.userId;

            // Store userId in localStorage
            localStorage.setItem("userId", userId);
            console.log("User ID:", userId);

            // Navigate to dashboard with userId
            navigate("/content/dashboard");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="signInPage">
            <h1 className="signInText">Sign In</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <p className="forgotPassword">Forgot your password?</p>
                <button type="submit">Sign In</button>
                <p className="moveToSignUp">
                    Don't have an account?{" "}
                    <span onClick={onSwitchToSignUp} style={{ cursor: "pointer", color: "blue" }}>
                        Create New Account
                    </span>
                </p>
            </form>
        </div>
    );
}

export default SignIn;
