import React, { useContext, useEffect, useState } from "react";
import Navbar from "./navbar";
import axios from "axios";
import { format } from "date-fns";
import { AuthContext } from "../context/authContext";
import { getDialogContentTextUtilityClass } from "@mui/material";

const Bookings = (id) => {
  const { user } = useContext(AuthContext);
  const [booked, setBooked] = useState([]);
  useEffect(() => {
    const orders = () => {
      try {
        axios
          .get("http://localhost:8000/api/v1/order", {
            user: id,
          })
          .then((res) => {
            setBooked(res.data.orders);
          });
      } catch (err) {
        return err;
      }
    };
    orders();
  }, []);

  const handleDate = (date) => {
    return date.split("T")[0];
  };

  return (
    <>
      <Navbar searchbar={false} />
      <div className="p-4">
        {booked.map((item) => (
          <div className="border-2 w-11/12 m-auto p-2 mt-4 rounded-md">
            <div className="text-2xl font-bold">Hotel Name - {item.hotel}</div>
            <div className="text-lg font-semibold">Days - {item.days}</div>
            <div className="text-lg font-semibold">
              Amount Paid - ₹{item.amtPaid / 100}
            </div>
            <div className="text-lg font-semibold">
              Start Date - {handleDate(item.dates[0])}
            </div>
            <div className="text-lg font-semibold">
              End Date - {handleDate(item.dates[1])}
            </div>
            <div>
              <h2 className="text-lg font-semibold">Rooms Booked</h2>
              <div className="flex gap-2">
                {item.rooms.map((item) => (
                  <div className="text-semibold">{item}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Bookings;
