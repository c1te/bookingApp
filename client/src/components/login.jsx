import React, { useContext, useEffect, useState } from "react";
import { FormControl, InputLabel, Input, Button } from "@mui/material";
import Register from "./Register";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(true);
  const url = "http://localhost:8000/api/v1/login";

  useEffect(() => {
    setOpen(false);
  }, []);

  const navigate = useNavigate();

  const { user, loading, error, dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(url, { email: email, password: password });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      if (user) {
        navigate(-1);
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      alert(err.response.data.message);
    }
  };

  return (
    <>
      {!open && (
        <div className="w-max m-auto border-2 mt-44 w-72">
          <h2 className="text-black text-center mt-2 text-2xl">Login</h2>
          <form onSubmit={handleSubmit} className="h-80">
            <div className="m-auto w-max mt-10">
              <FormControl>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input
                  id="email"
                  aria-describedby="my-helper-text"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
            </div>
            <div className="m-auto w-max mt-4">
              <FormControl className="relative inline-block flex">
                <InputLabel htmlFor="my-input">Password</InputLabel>
                <Input
                  type="password"
                  id="password"
                  aria-describedby="my-helper-text"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormControl>
            </div>
            <div className="m-auto w-max mt-10">
              <Button variant="contained" type="submit" disabled={loading}>
                Login
              </Button>
            </div>
          </form>
          <Button onClick={() => setOpen(true)}>Register</Button>
        </div>
      )}
      {open && <Register setOpen={setOpen} />}
    </>
  );
};

export default Login;
