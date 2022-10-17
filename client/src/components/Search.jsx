import React, { useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import HotelIcon from "@mui/icons-material/Hotel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { DateRange } from "react-date-range";
import { useState } from "react";
import { format } from "date-fns";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/searchContext";

const Search = () => {
  const [destination, setDestination] = useState("");
  const [open, openDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOption, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const handleoptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]:
          operation === "i"
            ? options[name] + 1
            : options[name] !== 0
            ? options[name] - 1
            : options[name],
      };
    });
  };

  const navigate = useNavigate();
  const { dispatch } = useContext(SearchContext);
  useEffect(() => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    console.log(destination);
  }, [destination, dates, options]);

  const handleSearch = () => {
    navigate("/hotel");
  };

  return (
    <div className="w-8/12 m-auto relative top-7 bg-white h-16 border-2 border-yellow-500 rounded-md justify-evenly flex items-center">
      <div className=" flex justify-start items-center w-9/12 justify-between">
        <HotelIcon />
        <TextField
          id="outlined-basic"
          label="Location"
          variant="outlined"
          size="small"
          onChange={(e) => setDestination(e.target.value)}
        />
        <div
          onClick={() => {
            openDate(!open);
            setOpenOptions(false);
          }}
        >
          <CalendarMonthIcon />
        </div>
        <div>
          <button
            onClick={() => {
              openDate(!open);
              setOpenOptions(false);
            }}
          >
            <TextField
              id="outlined-basic"
              label="Date"
              variant="outlined"
              size="small"
              value={`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                dates[0].endDate,
                "MM/dd/yyyy"
              )}`}
              disabled
            />
          </button>
          <div className="absolute top-12 right-96 border-2 border-red-100 z-10">
            {open && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
              />
            )}
          </div>
        </div>
        <button
          onClick={() => {
            setOpenOptions(!openOption);
            openDate(false);
          }}
        >
          <FamilyRestroomIcon />
        </button>
        <button
          onClick={() => {
            setOpenOptions(!openOption);
            openDate(false);
          }}
        >
          <TextField
            id="outlined-basic"
            label="Person Count"
            variant="outlined"
            size="small"
            disabled
            value={`${options.adult} adult  ${options.children} child ${options.room} room`}
          />
        </button>
      </div>
      {openOption && (
        <div className="w-60 h-28 right-48 top-12 rounded-md bg-gray-200 absolute">
          <div className="m-auto mt-2">
            <div className="flex justify-between w-10/12 m-auto">
              Adult
              <div className="flex justify-evenly items-center w-6/12">
                <RemoveCircleOutlineIcon
                  onClick={() => handleoptions("adult", "d")}
                />
                <div>{options.adult}</div>
                <ControlPointIcon onClick={() => handleoptions("adult", "i")} />
              </div>
            </div>
          </div>
          <div className="m-auto mt-2">
            <div className="flex justify-between w-10/12 m-auto">
              Children
              <div className="flex justify-evenly items-center w-6/12">
                <RemoveCircleOutlineIcon
                  onClick={() => handleoptions("children", "d")}
                />
                <div>{options.children}</div>
                <ControlPointIcon
                  onClick={() => handleoptions("children", "i")}
                />
              </div>
            </div>
          </div>
          <div className="m-auto mt-2">
            <div className="flex justify-between w-10/12 m-auto">
              Room
              <div className="flex justify-evenly items-center w-6/12">
                <RemoveCircleOutlineIcon
                  onClick={() => handleoptions("room", "d")}
                />
                <div>{options.room}</div>
                <ControlPointIcon onClick={() => handleoptions("room", "i")} />
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <Button variant="contained" onClick={handleSearch}>
          <SearchIcon />
          Search
        </Button>
      </div>
    </div>
  );
};

export default Search;
