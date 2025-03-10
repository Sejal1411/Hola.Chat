import React, { useState, useEffect } from "react";
import { Backdrop, Button, CircularProgress, TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toaster from "./Toaster";
import "../index.css"; // Import the CSS file

const SignupForm = ({ setShowLogin }) => {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [signInStatus, setSignInStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();

  // Track sign-in status changes and hide status message after 3 seconds
  useEffect(() => {
    if (signInStatus) {
      const timer = setTimeout(() => {
        setSignInStatus(""); // Clear the sign-in status after 3 seconds
      }, 3000);

      // Cleanup timer if signInStatus changes before 3 seconds
      return () => clearTimeout(timer);
    }
  }, [signInStatus]);

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Regex for email validation
  };

  const signUpHandler = async () => {
    if (!validateEmail(data.email)) {
      setSignInStatus({ msg: "Invalid email format!", key: Math.random() });
      return;
    }

    if (data.password !== confirmPassword) {
      setSignInStatus({ msg: "Passwords do not match!", key: Math.random() });
      return;
    }

    setLoading(true);
    try {
      const config = { headers: { "Content-type": "application/json" } };

      const response = await axios.post(
        "http://localhost:8000/user/signup/", // Updated URL
        data,
        config
      );

      setSignInStatus({ msg: "Success", key: Math.random() });
      localStorage.setItem("userData", JSON.stringify(response.data));
      navigate("/app/welcome");
    } catch (error) {
      console.error("Signup error:", error);

      if (error.response) {
        setSignInStatus({
          msg: error.response.data.message || "Signup failed!",
          key: Math.random(),
        });
      } else if (error.request) {
        setSignInStatus({
          msg: "No response from server. Try again!",
          key: Math.random(),
        });
      } else {
        setSignInStatus({
          msg: `Error: ${error.message}`,
          key: Math.random(),
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const renderPasswordVisibilityIcon = (show, handleClick) => (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClick}
        edge="end"
      >
        {show ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
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
          InputProps={{
            endAdornment: renderPasswordVisibilityIcon(showPassword, handleClickShowPassword),
          }}
        />
        <TextField
          required
          onChange={confirmPasswordHandler}
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          autoComplete="new-password"
          color="secondary"
          InputProps={{
            endAdornment: renderPasswordVisibilityIcon(showConfirmPassword, handleClickShowConfirmPassword),
          }}
        />

        <Button
          variant="outlined"
          color="secondary"
          onClick={signUpHandler}
          className="gradient-button"
        >
          Sign Up
        </Button>

        <p>
          Already have an Account?{" "}
          <span
            className="hyper"
            onClick={() => setShowLogin(true)}
          >
            Log in
          </span>
        </p>

        {signInStatus && <Toaster key={signInStatus.key} message={signInStatus.msg} />}
      </div>
    </>
  );
};

export default SignupForm;
