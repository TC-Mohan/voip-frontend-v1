
import { CircularProgress } from "@mui/material";
import React from "react";

const PrimaryLoader = () => {
  return (    <>
      <CircularProgress
        visible={true}
        height="80"
        width="80"
        color="#14ca73"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />

      {/* <Image
        src="/images/growth-kitchen.png"
        alt="logo"
        width={150}
        height={80}
      /> */}
    </>
  );
};

export default PrimaryLoader;
