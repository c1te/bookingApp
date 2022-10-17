import React, { useContext, useEffect, useState } from "react";
import Navbar from "./navbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { SearchContext } from "../context/searchContext";

const List = () => {
  const res = useContext(SearchContext);
  console.log(res.destination);
  const location = useLocation();
  const [destination, setDestination] = useState(res.destination);
  const [dates, setDates] = useState(res.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(res.options);
  const [type, setType] = useState(location.state.type);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(999);

  const { data, loading, error, refetch } = useFetch(
    `http://localhost:8000/api/v1/hotel?city=${destination}&min=${min}&max=${max}&type=${type}`
  );

  const navigate = useNavigate();

  const handleClick = () => {
    refetch();
  };
  const { dispatch } = useContext(SearchContext);
  const handleAvail = (id) => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate(`${id}`, { state: { destination, dates, options } });
  };

  const handleoptions = (name, value) => {
    value = Number(value);
    setOptions((prev) => {
      return {
        ...prev,
        [name]: value === 0 ? (options[name] = 1) : (options[name] = value),
      };
    });
  };
  return (
    <>
      <Navbar seacrbar={false} />
      <div className=" w-11/12 m-auto my-6 flex justify-between">
        <div className="listSB bg-yellow-500 w-80 rounded-md">
          <div className="w-11/12  m-auto h-full mt-4">
            <p className="text-2xl font-semibold">Search</p>
            <div className="mt-4 bg-white rounded-md ">
              <Box
                sx={{
                  width: 500,
                  maxWidth: "100%",
                }}
              >
                <TextField
                  fullWidth
                  label="Destination"
                  id="fullWidth"
                  defaultValue={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </Box>
            </div>
            <div className="mt-10 bg-white rounded-md">
              <Box
                sx={{
                  width: 500,
                  maxWidth: "100%",
                }}
              >
                <TextField
                  fullWidth
                  label="Check-In Date"
                  id="fullWidth"
                  onClick={() => setOpenDate(!openDate)}
                  defaultValue={`${format(
                    dates[0].startDate,
                    "MM/dd/yyyy"
                  )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                  value={`${format(
                    dates[0].startDate,
                    "MM/dd/yyyy"
                  )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                  disabled
                />
                <div className="absolute left-14 border-2 border-red-100 z-10">
                  {openDate && (
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDates([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={dates}
                    />
                  )}
                </div>
              </Box>
            </div>
            <div className="mt-4">
              <p className="text-base font-semibold">Options</p>
              <div className="flex justify-between ">
                <div className="mt-2 text-gray-700">
                  <p>Min Price(per night)</p>
                </div>
                <div className="w-1/4 bg-white rounded-md">
                  <TextField
                    label="Price"
                    id="outlined-size-small"
                    size="small"
                    onChange={(e) => setMin(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <div className="mt-2 text-gray-700">
                  <p>Max Price(per night)</p>
                </div>
                <div className="w-1/4 bg-white rounded-md">
                  <TextField
                    label="Price"
                    id="outlined-size-small"
                    size="small"
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <div className="mt-2 text-gray-700">
                  <p>Adult</p>
                </div>
                <div className="w-1/4 bg-white rounded-md">
                  <TextField
                    label="Count"
                    id="outlined-size-small"
                    size="small"
                    value={options.adult}
                    onChange={(e) => handleoptions("adult", e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <div className="mt-2 text-gray-700">
                  <p>Children</p>
                </div>
                <div className="w-1/4 bg-white rounded-md">
                  <TextField
                    label="Count"
                    id="outlined-size-small"
                    size="small"
                    value={options.children}
                    onChange={(e) => handleoptions("children", e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <div className="mt-2 text-gray-700">
                  <p>Room</p>
                </div>
                <div className="w-1/4 bg-white rounded-md">
                  <TextField
                    label="Count"
                    id="outlined-size-small"
                    size="small"
                    value={options.room}
                    onChange={(e) => handleoptions("room", e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="w-max m-auto mt-4">
              <Button variant="contained" onClick={handleClick}>
                <p> Search </p>
              </Button>
            </div>
          </div>
        </div>
        <div className="result w-9/12 ">
          {loading ? (
            "loading"
          ) : (
            <>
              {data.map((item) => (
                <div className="h-72 border-2 border-gray-400 rounded-md resultCard">
                  <div className="flex justify-between my-4 mr-6 ml-2">
                    <div className="displayimg">
                      <img
                        src="https://cdn-eimid.nitrocdn.com/vgzJytFNVhJtDZHFJEJPXglHtVtHelGU/assets/static/optimized/rev-01237c9/wp-content/uploads/2019/12/furnished-1-bedroom-hotel-apartment-in-sheraton-grand-hotel-dubai-4-830x500.jpg"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <p className="text-blue-800 text-2xl font-bold">
                        {item.name}
                      </p>
                      <p>{item.distance}m from center</p>
                      <p className="bg-green-700 w-max px-2 rounded-md text-white ">
                        Free Airport Taxi
                      </p>
                      <p className="font-bold ">
                        Studio Apartment with Air Conditioning
                      </p>
                      <p>{item.desc}</p>
                      <p className="text-green-700 font-bold">
                        Free Cancelation
                      </p>
                      <p className="text-green-600">
                        You can cancel later , so lock in this great price today
                      </p>
                    </div>
                    <div className="text-right flex flex-col justify-between">
                      <div>
                        <p className="w-max ml-auto bg-blue-800 text-white px-2 rounded-md">
                          4.4
                        </p>
                      </div>
                      <div className="h-24 flex flex-col justify-between">
                        <p className="font-semibold text-2xl">
                          ${item.cheapestPrice}
                        </p>
                        <p className="font-light text-sm">
                          includes taxes and fees
                        </p>

                        <Button
                          variant="contained"
                          disableElevation
                          onClick={() => {
                            handleAvail(item._id);
                          }}
                        >
                          See Availability
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default List;
