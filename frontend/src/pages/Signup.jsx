import React, { useState } from "react";
import { IoEye } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase.js";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.jsx";
const Signup = () => {
  const primaryColor = "#ff4d2d";
  const hovercolor = "#e64323";
  const bgcolor = "#fff9f6";
  const bordercolor = "#ddd";
  const [showpassword, setShowpassword] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [err, setErr] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSignup = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/signup",
        {
          fullName,
          email,
          password,
          mobile,
          role,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(data))
      setErr("");
      setLoading(false);
    } catch (error) {
      setErr(error?.response?.data?.message || "Something went wrong!");
      setLoading(false);
      console.error("❌ Signup failed:", error);
    }
  };
  const handleGoogleAuth = async () => {
    if (!mobile) {
      return setErr("mobile no is required");
    }
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log("✅ Google login success:", result.user);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/google-auth",
        {
          fullName: result.user.displayName,
          email: result.user.email,
          role,
          mobile,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(data))
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
          create your account to get started with delicious food deleivery
        </p>

        {/* full name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="">
            full name
          </label>
          <input
            placeholder="enter your name"
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
            style={{ border: `1px solid ${bordercolor}` }}
            onChange={(e) => setFullname(e.target.value)}
            value={fullName}
            required
          />
        </div>
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
        {/* mobile */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="">
            mobile
          </label>
          <input
            placeholder="enter your mobile"
            type="mobile"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
            style={{ border: `1px solid ${bordercolor}` }}
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
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
        {/* role */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="role"
          >
            role
          </label>
          <div className="flex gap-2">
            {["user", "owner", "deleiveryboy"].map((r) => (
              <button
                className="flex border rounded-lg px-3 py-2 text-center font-medium transition-colors"
                onClick={() => setRole(r)}
                style={
                  role == r
                    ? { backgroundColor: primaryColor, color: "white" }
                    : { border: bordercolor, color: "#333" }
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <button
          className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 hover:bg-[#e64323] cursor-pointer`}
          style={{ backgroundColor: primaryColor, color: "white" }}
          onClick={handleSignup}
          disabled={loading}
        >
          {" "}
          {loading ? <ClipLoader size={20} className="text-green-500" /> : "signup"}
        </button>
        {err && <p className="text-rose-500 text-center my-[10px]">*{err}</p>}
        <button
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 hover:bg-[#d7d9d8] cursor-pointer"
          onClick={handleGoogleAuth}
        >
          <FcGoogle size={20} /> <span>signup with google</span>
        </button>
        <p className="text-center mt-2 " onClick={() => navigate("/signin")}>
          already have an account?{" "}
          <span className="text-[#ff4d2d] cursor-pointer">signin</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
