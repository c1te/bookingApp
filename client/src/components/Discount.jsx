import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

const Discount = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {!user && (
        <>
          <div>
            <h1 className="text-5xl font-bold">
              A Lifetime of Discounts? It's Genius
            </h1>
            <p className="text-lg font-thin mt-6">
              Get Rewarded for your travels - unlock instant savings of 10% or
              more with a free Booking Account
            </p>
            <div className="mt-6">
              <Link to="/register">
                <Button variant="contained" disableElevation>
                  REGISTER
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Discount;
