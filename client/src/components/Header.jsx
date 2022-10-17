import React from "react";
import HotelIcon from "@mui/icons-material/Hotel";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";

const Header = () => {
  return (
    <div className="header text-white flex w-2/4 justify-between">
      <div className="hotel flex flex-col justify-evenly items-center border-2 px-6 rounded-md">
        <HotelIcon fontSize="large" />
        <div className="block">Stay</div>
      </div>
      <div className="flex flex-col justify-evenly items-center">
        <FlightTakeoffIcon fontSize="large" />
        <div className="block">Flight</div>
      </div>
      <div className="flex flex-col justify-evenly items-center">
        <DirectionsCarIcon fontSize="large" />
        <div className="block">Car Rental</div>
      </div>
      <div className="flex flex-col justify-evenly items-center">
        <HotelIcon fontSize="large" />
        <div className="block">Attractions</div>
      </div>
      <div className="flex flex-col justify-evenly items-center">
        <LocalTaxiIcon fontSize="large" />
        <div className="block">Airport Taxi</div>
      </div>
    </div>
  );
};

export default Header;
