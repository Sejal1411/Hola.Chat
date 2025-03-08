import React, { useState } from "react";
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

  const signUpHandler = async () => {
    if (data.password !== confirmPassword) {
      setSignInStatus({
        msg: "Password and Confirm Password do not match",
        key: Math.random(),
      });
      return;
    }

    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      console.log("Sending data:", JSON.stringify(data)); // Log the request payload

      const response = await axios.post(
        "http://localhost:8000/user/signup/",
        data,
        config
      );

      setSignInStatus({ msg: "Success", key: Math.random() });
      navigate("/app/welcome");
      localStorage.setItem("userData", JSON.stringify(response.data));

    } catch (error) {
      console.error("Error response:", error); 

      if (error.response) {
        const status = error.response.status;
        const message =
          status === 405
            ? "User with this email ID already Exists"
            : status === 406
            ? "User Name already Taken, Please take another one"
            : `Error: ${error.response.data.message || "Something went wrong"}`;

        setSignInStatus({ msg: message, key: Math.random() });

      } else if (error.request) {
        // Handles cases where the request was made, but no response was received
        setSignInStatus({
          msg: "No response from server. Please try again later.",
          key: Math.random(),
        });

      } else {
        // Handles other unexpected errors
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
          onChange={changeHandler}
          id="standard-basic"
          label="Enter User Name"
          variant="outlined"
          color="secondary"
          name="name"
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              signUpHandler();
            }
          }}
        />
        <TextField
          onChange={changeHandler}
          // id="standard-basic"
          label="Enter Email Address"
          variant="outlined"
          color="secondary"
          name="email"
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              signUpHandler();
            }
          }}
        />
        <TextField
          onChange={changeHandler}
          id="outlined-password-input"
          label="Password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          color="secondary"
          name="password"
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              signUpHandler();
            }
          }}
          InputProps={{
            endAdornment: renderPasswordVisibilityIcon(showPassword, handleClickShowPassword),
          }}
        />
        <TextField
          onChange={confirmPasswordHandler}
          id="outlined-confirm-password-input"
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          autoComplete="current-password"
          color="secondary"
          name="confirmPassword"
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              signUpHandler();
            }
          }}
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
            onClick={() => {
              setShowLogin(true);
            }}
          >
            Log in
          </span>
        </p>

        {signInStatus && (
          <Toaster key={signInStatus.key} message={signInStatus.msg} />
        )}
      </div>
    </>
  );
};

export default SignupForm;