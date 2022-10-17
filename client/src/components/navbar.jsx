import React, { useContext } from "react";
import Discount from "./Discount";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Header from "./Header";
import SearchBr from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import UserInt from "./UserInt";

const Navbar = ({ searchbar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  console.log(path);
  const { user } = useContext(AuthContext);
  const handleClick = (type) => {
    if (type === "Register") {
      navigate("/register");
    } else if (type === "Login") {
      navigate("/login");
    }
  };
  return (
    <div className="navbar w-full bg-blue-900">
      <div className="p-4">
        <div className="navContainer m-auto w-11/12 flex justify-between content-center">
          <Link to="/">
            <div>
              <h2 className="text-white text-2xl">Book</h2>
            </div>
          </Link>
          {!user && (
            <>
              <Stack className="navItem" direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleClick("Register")}
                >
                  Register
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleClick("Login")}
                >
                  Login
                </Button>
              </Stack>
            </>
          )}
          {user && (
            <>
              <UserInt />
            </>
          )}
        </div>
        <div className="w-11/12 m-auto mt-7">
          <Header />
        </div>
        <div className="w-11/12 m-auto text-white my-10">
          <Discount />
        </div>
      </div>
      {searchbar && <SearchBr />}
    </div>
  );
};

export default Navbar;
