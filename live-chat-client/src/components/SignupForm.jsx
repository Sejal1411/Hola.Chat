import React, { useState, useEffect } from "react";
import { Backdrop, Button, CircularProgress, TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toaster from "./Toaster";
import "../index.css"; // Import the CSS file

const SignupForm = ({ setShowLogin }) => {
  const [data, setData] = useState({ name: "", email: "", password: ""});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [signInStatus, setSignInStatus] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();

  // Hide status message after 3 seconds
  useEffect(() => {
    if (signInStatus) {
      const timer = setTimeout(() => setSignInStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [signInStatus]);

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const signUpHandler = async () => {
    if (!data.name || !data.email || !data.password || !confirmPassword) {
      setSignInStatus({ msg: "All fields are required!", key: Math.random() });
      return;
    }

    if (data.password !== confirmPassword) {
      setSignInStatus({ msg: "Passwords do not match!", key: Math.random() });
      return;
    }

    if (!validateEmail(data.email)) {
      setSignInStatus({ msg: "Invalid email format!", key: Math.random() });
      return;
    }

    if (data.password.length < 6) {
      setSignInStatus({ msg: "Password must be at least 6 characters long!", key: Math.random() });
      return;
    }

    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: confirmPassword,
    };
  
    console.log("Data being sent to backend:", payload);

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/user/signup/", payload);
    
      setSignInStatus({ msg: "Success! Redirecting...", key: Math.random() });
      localStorage.setItem("token", response.data.token);
      setTimeout(() => navigate("/app/welcome"), 1000);
    
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      setSignInStatus({ 
        msg: error.response?.data?.message || "Signup failed!", 
        key: Math.random() });
    } finally {
      setLoading(false);
    }
  };

  const renderPasswordVisibilityIcon = (show, handleClick) => (
    <InputAdornment position="end">
      <IconButton aria-label="toggle password visibility" onClick={handleClick} edge="end">
        {show ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="secondary" />
      </Backdrop>
      
      <div className="login-box">
        <p className="login-text">Create your Account</p>

        <TextField 
          required 
          onChange={changeHandler} 
          label="Enter User Name" 
          variant="outlined" 
          color="secondary" 
          name="name" 
        />

        <TextField 
          required 
          onChange={changeHandler} 
          label="Enter Email Address" 
          variant="outlined" 
          color="secondary" 
          name="email" 
        />
        
        <TextField
          required
          onChange={changeHandler}
          label="Password"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          color="secondary"
          name="password"
          InputProps={{ endAdornment: renderPasswordVisibilityIcon(showPassword, () => setShowPassword(!showPassword)) }}
        />
        
        <TextField
          required
          onChange={confirmPasswordHandler}
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          autoComplete="new-password"
          color="secondary"
          InputProps={{ endAdornment: renderPasswordVisibilityIcon(showConfirmPassword, () => setShowConfirmPassword(!showConfirmPassword)) }}
        />

        <Button 
          variant="outlined" 
          color="secondary" 
          className="gradient-button" 
          onClick={signUpHandler} 
          disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>

        <p>
          Already have an Account?{" "}
          <span className="hyper" onClick={() => setShowLogin(true)}>Log in</span>
        </p>

        {signInStatus && <Toaster key={signInStatus.key} message={signInStatus.msg} />}
      </div>
    </>
  );
};

export default SignupForm;
