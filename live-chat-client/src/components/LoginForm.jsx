import React, { useState } from "react";
import { Backdrop, Button, CircularProgress, TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toaster from "./Toaster";

const LoginForm = ({ setShowLogin }) => {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [logInStatus, setLogInStatus] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    console.log("Data being sent:", data);

    if (!data.email || !data.password) {
      setLogInStatus({ msg: "Both fields are required!", key: Math.random() });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/user/login/", data, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Login Success:", response.data);
      setLogInStatus({ msg: "Login Successful!", key: Math.random() });

      localStorage.setItem("userData", JSON.stringify(response.data));
      setTimeout(() => navigate("/app/welcome"), 1000); // Redirect after success

    } catch (error) {
      console.error("Login Error:", error);
      setLogInStatus({
        msg: error.response?.data?.error || "Invalid username or password",
        key: Math.random(),
      });

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
        <p className="login-text">Login to your Account</p>

        <TextField
          required
          onChange={changeHandler}
          label="Enter Email"
          variant="outlined"
          color="secondary"
          name="email"
          value={data.email}
          onKeyDown={(event) => event.key === "Enter" && loginHandler()}
        />

        <TextField
          required
          onChange={changeHandler}
          label="Enter Password"
          type={showPassword ? "text" : "password"}
          color="secondary"
          name="password"
          value={data.password}
          onKeyDown={(event) => event.key === "Enter" && loginHandler()}
          InputProps={{ endAdornment: renderPasswordVisibilityIcon(showPassword, () => setShowPassword(!showPassword)) }}
        />

        <Button variant="outlined" color="secondary" onClick={loginHandler} className="gradient-button">
          Login
        </Button>

        <p>
          Don't have an Account?{" "}
          <span className="hyper" onClick={() => setShowLogin(false)}>
            Sign up
          </span>
        </p>

        {logInStatus && <Toaster key={logInStatus.key} message={logInStatus.msg} />}
      </div>
    </>
  );
};

export default LoginForm;
