import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
const Nav = () => {
  const userData = useSelector(state => state.user);
  
  return (
    <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible">
      <h1 className="text-3xl font-bold  mb-2 text-[#ff4d2d]">
        Bharatpur-foods
      </h1>
      <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] flex">
        <div className=" flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
          <IoLocationSharp size={25} className="text-[#ff4d2d]" />
          <div className="w-[80%] truncate text-gray-600">btp</div>
        </div>
        <div className="w-[80%] gap-[10px] flex items-center">
          <FaSearch size={25} className="text-[#ff4d2d]" />
          <input
            type="text"
            placeholder="search delicious food..."
            className="px-[10px] text-gray-700 outline-0 w-full"
          />
        </div>
      </div>
      <div className="relative cursor-pointer">
        <FaShoppingCart size={25} className="text-[#ff4d2d]" />
        <span className="absolute right-[-9px] top-[-12px] text-[#ff4d2d]">
          0
        </span>
      </div>
      <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium">
        My Order
      </button>
      <div>{userData?.fullName?.slice(0, 1)}</div>
    </div>
  );
};

export default Nav;
