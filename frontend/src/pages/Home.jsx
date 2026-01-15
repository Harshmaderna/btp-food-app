import React from "react";
import { useSelector } from "react-redux";
import Userdashboard from "../components/Userdashboard";
import OwnerDashboard from "../components/OwnerDashboard";
import DelieveryBoy from "../components/DelieveryBoy";

const Home = () => {
  const { userData } = useSelector((state) => state.user);
  


  return (
    <div className="w-screen-[100vw] min-h-screen-[100vh] pt-[100px] flex flex-col items-center">
      {userData.user.role == "user" && <Userdashboard />}
      {userData.role == "delivery_boy" && <DelieveryBoy />}
      {userData.role == "owner" && <OwnerDashboard />}
    </div>
  );
};

export default Home;
