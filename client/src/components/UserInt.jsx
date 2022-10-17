import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import { useNavigate, Link } from "react-router-dom";

const UserInt = () => {
  const url = "http://localhost:8000/api/v1/logout";
  const { user, dispatch } = useContext(AuthContext);
  const [openUserInt, setOpenUserInt] = useState(false);
  const handleLogOut = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    try {
      await axios.get(url);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const navigate = useNavigate();

  const handleBooking = async () => {
    navigate("/bookings", { fetch: true });
  };
  return (
    <>
      <div>
        <div
          className="text-white flex gap-x-2 cursor-default"
          onClick={() => setOpenUserInt(!openUserInt)}
        >
          <p>{user.name}</p>
          <AccountCircleIcon />
        </div>

        {openUserInt && (
          <div className="absolute w-20 h-20 bg-white rounded-md flex flex-col justify-around text-center mt-2 cursor-default">
            <Button onClick={handleLogOut}>LogOut</Button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserInt;
