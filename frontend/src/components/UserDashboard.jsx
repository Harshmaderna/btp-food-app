import React from "react";
import Nav from "./Nav";


const Userdashboard = () => {
  return (
    <div className="w-full h-[180px] flex items-center justify-between md:justify-center gap-[30px] px-[30px] fixed top-0 z-9999 bg-[#fff9f6] overflow-visible">
      {/* <h1 className="text-3xl font-bold  mb-2 text-[#ff4d2d] ">Bharatpur</h1>
      <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px]">
        <div></div>
        <div></div>
      </div> */}
      <Nav />
    </div>
  );
};

export default Userdashboard;
