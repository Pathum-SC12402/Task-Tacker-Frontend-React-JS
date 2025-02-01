import React, { useState } from "react";
import CurrentTime from "../components/parts/CurrentTime";
import "../assets/styles/Start.css";
import SignIn from "../components/signIn/SignIn";
import SignUp from "../components/signUp/SignUp";


function StartPage() {

  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <div className="signInContainer">
        <h1 className="welcomeText">Welcome!<span className="welcomePart">to Task Tracker</span><CurrentTime /></h1>

        {isSignUp ? (
          <SignUp onSwitchToSignIn={toggleForm} />
        ) : (
          <SignIn onSwitchToSignUp={toggleForm} />
        )}
    </div>
  );
}

export default StartPage;