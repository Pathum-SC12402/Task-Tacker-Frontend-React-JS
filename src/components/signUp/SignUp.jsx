import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import axios from "axios";

function SignUp({ onSwitchToSignIn }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password || !formData.confirmPassword) {
            setError("All fields are mandatory!");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        setError("");

        try {
            const response = await axios.post("http://localhost:8000/api/auth/signup", {
                email: formData.email,
                password: formData.password,
            });
            if (response.status === 201) {
                onSwitchToSignIn();
            }
        } catch (error) {
            setError("An error occurred during sign-up. Please try again.");
        }
    };

    return (
        <div className="signUpPage">
            <h1 className="signUpText">Sign Up</h1>
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
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Sign Up</button>
                <p className="moveToSignIn">
                    Already have an account?{" "}
                    <span onClick={onSwitchToSignIn} style={{ cursor: "pointer", color: "blue" }}>
                        Sign In
                    </span>
                </p>
           </form>
        </div>
    );
}

export default SignUp;