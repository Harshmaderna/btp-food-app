import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";


const useGetCurrentUser = () => {
    const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/current", {
          withCredentials: true,
        });
        
        dispatch(setUserData(res.data))
        console.log(res.data)
      } catch (error) {
       
        console.log(error);
      }
    }
    fetchUser()
  },[]);
};
export default useGetCurrentUser; 




