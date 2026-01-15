import React, { useState } from "react";
import { IoEye } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
const Signin = () => {
  const primaryColor = "#ff4d2d";
  const hovercolor = "#e64323";
  const bgcolor = "#fff9f6";
  const bordercolor = "#ddd";
  const [showpassword, setShowpassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [err, setErr] = useState("");
  const handleSignin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/signin",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(res.data));
      setErr("");
      setLoading(false);
    } catch (error) {
      setErr(error?.response?.data?.message || "Something went wrong!");
      setLoading(false);
      console.error("❌ Signup failed:", error);
    }
  };
  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log("✅ Google login success:", result.user);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/google-auth",
        {
          email: result.user.email,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(data));
    } catch (error) {
      console.log("❌ Google login failed:", error.message);
    }
  };
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 "
      style={{ backgroundColor: bgcolor }}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full  max-w-md p-8 border-[1px]`}
        style={{ border: `1px solid ${bordercolor}` }}
      >
        <h1
          className={`text-3xl font-bold mb-2`}
          style={{ color: `${primaryColor}` }}
        >
          vingo
        </h1>
        <p className="text-gray-600 mb-8">
          Signin your account to get started with delicious food deleivery
        </p>

        {/* email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="">
            email
          </label>
          <input
            placeholder="enter your email"
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
            style={{ border: `1px solid ${bordercolor}` }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        {/* password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="">
            password
          </label>
          <div className="relative">
            <input
              placeholder="enter your password"
              type={`${showpassword ? "text" : "password"}`}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
              style={{ border: `1px solid ${bordercolor}` }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button
              className="absolute right-3 top-[14px] cursor-pointer text-gray-500"
              onClick={() => setShowpassword((prev) => !prev)}
            >
              {!showpassword ? <IoEye /> : <IoEyeOff />}
            </button>
          </div>
        </div>
        <div
          className="text-right mb-4 text-[#ff4d2d] font-medium cursor-pointer"
          onClick={() => navigate("/forgot-password")}
        >
          forgot password
        </div>

        <button
          className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 hover:bg-[#e64323] cursor-pointer`}
          style={{ backgroundColor: primaryColor, color: "white" }}
          onClick={handleSignin}
          disabled={loading}
        >
          {loading ? (
            <ClipLoader size={20} className="text-green-500" />
          ) : (
            "signin"
          )}
        </button>
        {err && <p className="text-rose-500 text-center my-[10px]">*{err}</p>}
        <button
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 hover:bg-[#d7d9d8] cursor-pointer"
          onClick={handleGoogleAuth}
        >
          <FcGoogle size={20} /> <span>signin with google</span>
        </button>
        <p className="text-center mt-2 " onClick={() => navigate("/signup")}>
          want to create a new account?{" "}
          <span className="text-[#ff4d2d] cursor-pointer">signup</span>
        </p>
      </div>
    </div>
  );
};

export default Signin;
