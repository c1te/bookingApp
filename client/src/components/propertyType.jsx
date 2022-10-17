import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const PropertyType = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8000/api/v1/hotel/countByType"
  );
  const image = [
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1515263487990-61b07816b324?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXBhcnRtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmVzb3J0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlsbGF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FiaW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  ];
  const navigate = useNavigate();
  const handleClick = (type) => {
    navigate("/hotel", { state: { type } });
  };
  return (
    <>
      <div className="w-11/12 m-auto mt-0 relative bottom-24">
        <h3 className="text-lg font-bold">Browse By Property Type</h3>
        <div className="flex justify-between">
          {loading
            ? "Please Wait"
            : data &&
              image.map((img, i) => (
                <div
                  className="w-60 h-60 mt-6"
                  key={i}
                  onClick={() => handleClick(data[i].type)}
                >
                  <img src={img} alt="" />
                  <div>
                    <p className="text-2xl font-bold capitalize">
                      {data[i]?.type}
                    </p>
                    <p className="text-lg">{data[i]?.count} Properties</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default PropertyType;
