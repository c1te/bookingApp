import React, { useContext, useEffect, useState } from "react";
import PropertyType from "./propertyType";
import HomeGuest from "./guestHome";
import useFetch from "../hooks/useFetch";
import { SearchContext } from "../context/searchContext";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8000/api/v1/hotel/countByCity?cities=berlin,madrid,london"
  );
  const { dispatch, dates, options } = useContext(SearchContext);
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");

  const [process, setProcess] = useState(false);
  useEffect(() => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    if (process === true) {
      navigate("/hotel", { state: { destination, dates, options } });
    }
  }, [destination]);

  return (
    <div className="w-11/12 ml-auto mr-auto mt-10">
      <h2 className="text-center text-4xl border-b-2 border-gray-400 w-60 m-auto pb-2">
        Featured
      </h2>
      {loading ? (
        "Please Wait"
      ) : (
        <div className="flex justify-evenly mt-6">
          <div
            className="w-96 h-96"
            onClick={() => {
              setDestination("berlin");
              setProcess(true);
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1599946347371-68eb71b16afc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVybGlufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <div className="relative left-4 bottom-16 text-white">
              <p className="text-2xl font-bold">Berlin</p>
              <p className="text-lg">{data[0]}</p>
            </div>
          </div>
          <div
            className="w-96 h-96"
            onClick={() => {
              setDestination("madrid");
              setProcess(true);
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1543783207-ec64e4d95325?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFkcmlkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <div className="relative left-4 bottom-16 text-white">
              <p className="text-2xl font-bold">Madrid</p>
              <p className="text-lg">{data[1]}</p>
            </div>
          </div>
          <div
            className="w-96 h-96"
            onClick={() => {
              setDestination("london");
              setProcess(true);
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bG9uZG9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
            <div className="relative left-4 bottom-16 text-white">
              <p className="text-2xl font-bold">London</p>
              <p className="text-lg">{data[2]}</p>
            </div>
          </div>
        </div>
      )}

      <PropertyType />
      <HomeGuest />
    </div>
  );
};

export default Featured;
