import React from "react";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const GuestHome = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(
    "http://localhost:8000/api/v1/hotel?featured=true&limit=3"
  );
  const handleClick = (id) => {
    navigate(`/hotel/${id}`);
  };
  return (
    <div className="w-11/12 m-auto relative bottom-10">
      <h2 className="text-lg font-bold">Guest House</h2>
      <div className="mt-6 flex h-max justify-between">
        {loading
          ? "Please Wait"
          : data.map((data) => (
              <div className="w-80 h-80" onClick={() => handleClick(data._id)}>
                <img
                  src="https://www.thespruce.com/thmb/b3kw75jb3IvPLL2hcaqfLn4m8s8=/941x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/guest-house-ideas-4687692-hero-6e644bf8c71e437896ce29be516d5dc9.jpg"
                  alt=""
                />
                <div>
                  <p className="font-bold text-lg mt-2">{data.name}</p>
                  <p className="font-thin text-lg bg-gray-300 w-max pl-2 pr-2 mt-2 rounded-md capitalize">
                    {data.city}
                  </p>
                  <p className="text-md font-semibold mt-2">
                    <LocalOfferOutlinedIcon fontSize="small" />
                    Starting From ${data.cheapestPrice}
                  </p>
                  <div className="flex justify-end m-auto mr-2">
                    <p className=" bg-blue-800 text-white pr-2 pl-2 rounded-md relative bottom-6">
                      4.5
                    </p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default GuestHome;
