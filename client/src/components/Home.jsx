import React from "react";
import Navbar from "./navbar";
import Featured from "./featured";
const Home = () => {
  return (
    <>
      <Navbar searchbar={true} />
      <Featured />
    </>
  );
};

export default Home;
