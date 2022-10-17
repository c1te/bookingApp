import React, { useState } from "react";
import { FormControl, InputLabel, Input, Button } from "@mui/material";

import axios from "axios";

const Register = ({ setOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const url = "http://localhost:8000/api/v1/register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(url, { name, email, password });
      localStorage.removeItem("user");
      if (res.data.success === true) {
        setOpen(false);
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <>
      <div className="w-max m-auto border-2 mt-44 w-72">
        <h2 className="text-black text-center mt-2 text-2xl">Register</h2>
        <form className="h-80" onSubmit={handleSubmit}>
          <div className="m-auto w-max mt-10">
            <FormControl>
              <InputLabel htmlFor="my-input">Name</InputLabel>
              <Input
                id="email"
                aria-describedby="my-helper-text"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormControl>
          </div>
          <div className="m-auto w-max mt-4">
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
            <Button variant="contained" type="submit">
              Sign Up
            </Button>
          </div>
        </form>
        <Button onClick={() => setOpen(false)}>Login</Button>
      </div>
    </>
  );
};

export default Register;
