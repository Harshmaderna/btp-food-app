import React, { useState } from "react";
import axios from "axios"
import { IoLocationSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { setUserData } from "../redux/userSlice";
const Nav = () => {
  const {userData, city} = useSelector((state) => state.user);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch()
  const handleLogOut = async() => {
    try {
      const result = await axios.get("http://localhost:3000/api/signout", {withCredentials: true})
      dispatch(setUserData(null))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible">
      {showSearch && (
        <div className="w-[90%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] flex fixed top-[80px] left-[5%] md:hidden">
          <div className=" flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
            <IoLocationSharp size={25} className="text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{city}</div>
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
      )}
      <h1 className="text-3xl font-bold  mb-2 text-[#ff4d2d]">
        Delicious-foods
      </h1>
      <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] hidden md:flex">
        <div className=" flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
          <IoLocationSharp size={25} className="text-[#ff4d2d]" />
          <div className="w-[80%] truncate text-gray-600">{city}</div>
         { console.log(city)}
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
      <div className="flex items-center gap-5">
        {showSearch ? (
          <RxCross2 size={25}
            className="text-[#ff4d2d] md:hidden" onClick={() => setShowSearch(false)}/>
        ) : (
          <FaSearch
            size={25}
            className="text-[#ff4d2d] md:hidden"
            onClick={() => setShowSearch(true)}
          />
        )}

        <div className="relative cursor-pointer">
          <FaShoppingCart size={25} className="text-[#ff4d2d]" />
          <span className="absolute right-[-9px] top-[-12px] text-[#ff4d2d]">
            0
          </span>
        </div>
        <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium">
          My Order
        </button>
        <div
          className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer"
          onClick={() => setShowInfo((prev) => !prev)}
        >
          {userData?.user?.fullName?.slice(0, 1)}
        </div>
        {showInfo && (
          <div className="fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]">
            <div>{userData?.user?.fullName}</div>
            <div className="md:hidden font-semibold cursor-pointer text-[#ff4d2d]">
              my Orders
            </div>
            <div className="text-[#ff4d2d] font-semibold cursor-pointer" onClick={handleLogOut}>
              LogOut
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
