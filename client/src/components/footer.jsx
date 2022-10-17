import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  console.log(path);
  return (
    <>
      {path !== "login" && path !== "register" ? (
        <>
          <div className="bg-blue-900 h-52 flex items-center">
            <div className="m-auto flex flex-col justify-around items-center">
              <div className="text-white">
                <p className="text-xl font-semibold text-center">
                  Save Time , Save Money!
                </p>
                <p className="font-thin">
                  Sign Up and we'll send the best deals to you
                </p>
              </div>
              <div className="mt-8">
                <div className="bg-white w-80 h-14 rounded-md flex items-center">
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="filled"
                  />
                  <Button variant="contained">Subscribe</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="h-14 bg-blue-500 flex justify-center items-center text-color-white">
            <Button variant="contained" color="success">
              List Property
            </Button>
          </div>
          <div className="h-10 bg-blue-500 mt-1 text-white flex underline justify-center">
            <div className="m-1 mx-4">
              <p>Customer Support</p>
            </div>
            <div className="m-1 mx-4">
              <p>Become An Affiliate</p>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Footer;
