import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Login() {
  const [showlogin, setShowLogin] = useState(false);

  return (
    <div className="login-container">
      <div className="image-container">
        {/* <img src={logo} alt="Logo" className="welcome-logo" /> */}
      </div>
      {showlogin ? (
        <LoginForm setShowLogin={setShowLogin} />
      ) : (
        <SignupForm setShowLogin={setShowLogin} />
      )}
    </div>
  );
}

export default Login;