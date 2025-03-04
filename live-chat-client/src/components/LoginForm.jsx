import React, { useState } from "react";
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toaster from "./Toaster";

const LoginForm = ({ setShowLogin }) => {
  const [data, setData] = useState ({ name: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [logInStatus, setLogInStatus] = useState("");

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    setLoading(true);
    console.log(data);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:8000/user/login/",
        data,
        config
      );
      console.log("Login : ", response);
      setLogInStatus({ msg: "Success", key: Math.random() });
      setLoading(false);
      localStorage.setItem("userData", JSON.stringify(response));
      navigate("/app/welcome");
    } catch (error) {
      setLogInStatus({
        msg: "Invalid User name or Password",
        key: Math.random(),
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
      <div className="login-box">
        <p className="login-text">Login to your Account</p>
        <TextField
          onChange={changeHandler}
          id="standard-basic"
          label="Enter User Name"
          variant="outlined"
          color="secondary"
          name="name"
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              loginHandler();
            }
          }}
        />
        <TextField
          onChange={changeHandler}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          color="secondary"
          name="password"
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              loginHandler();
            }
          }}
        />
        <Button
          variant="outlined"
          color="secondary"
          onClick={loginHandler}
          className="gradient-button"
          isLoading
        >
          Login
        </Button>
        <p>
          Don't have an Account?{" "}
          <span
            className="hyper"
            onClick={() => {
              setShowLogin(false);
            }}
          >
            Sign up
          </span>
        </p>
        {logInStatus ? (
          <Toaster key={logInStatus.key} message={logInStatus.msg} />
        ) : null}
      </div>
    </>
  );
};

export default LoginForm;