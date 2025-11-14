import React, { useState } from "react";
import axios from "axios";
import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const bordercolor = "#ddd";
  const primaryColor = "#ff4d2d";
  const navigate = useNavigate();
  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/send-otp",
        { email },
        { withCredentials: true }
      );
      console.log("OTP sent:", res.data);
      setErr("");
      setStep(2);
      setLoading(false);
    } catch (error) {
      setErr(error?.response?.data?.message || "Something went wrong!");
      setLoading(false);
      console.error("❌ Signup failed:", error);
    }
  };
  const verifyOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/verify-otp",
        { email, otp },
        { withCredentials: true }
      );
      console.log(res.data);
      setErr("");
      setStep(3);
      setLoading(false);
    } catch (error) {
      setErr(error?.response?.data?.message || "Something went wrong!");
      setLoading(false);
      console.error("❌ Signup failed:", error);
    }
  };
  const resetPassword = async () => {
    if (newpassword !== confirmpassword) {
      return null;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/reset-password",
        { email, newPassword: newpassword },
        { withCredentials: true }
      );
      console.log("OTP sent:", res.data);
      setErr("");
      setLoading(false);
      navigate("/signin");
    } catch (error) {
      setErr(error?.response?.data?.message || "Something went wrong!");
      setLoading(false);
      console.error("❌ Signup failed:", error);
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-4 mb-4">
          <TbArrowBackUp
            size={30}
            className="text-[#ff4d2d] cursor-pointer"
            onClick={() => navigate("/signin")}
          />
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
            forgot password
          </h1>
        </div>
        {step == 1 && (
          <div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor=""
              >
                email
              </label>
              <input
                placeholder="enter your email"
                type="email"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                style={{ border: `1px solid ${bordercolor}` }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <button
                className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 hover:bg-[#e64323] cursor-pointer`}
                style={{ backgroundColor: primaryColor, color: "white" }}
                onClick={handleSendOtp}
                disabled={loading}
              >
                {loading ? <ClipLoader size={20} className="text-green-500" /> : "send otp"}
              </button>
              {err && (
                <p className="text-rose-500 text-center my-[10px]">*{err}</p>
              )}
            </div>
          </div>
        )}
        {step == 2 && (
          <div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor=""
              >
                otp
              </label>
              <input
                placeholder="enter otp"
                type="email"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                style={{ border: `1px solid ${bordercolor}` }}
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
              <button
                className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 hover:bg-[#e64323] cursor-pointer`}
                style={{ backgroundColor: primaryColor, color: "white" }}
                onClick={verifyOtp}
                disabled={loading}
              >
                {loading ? <ClipLoader size={20} className="text-green-500"/> : "verify otp"}
              </button>
              {err && (
                <p className="text-rose-500 text-center my-[10px]">*{err}</p>
              )}
            </div>
          </div>
        )}
        {step == 3 && (
          <div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="newPassword"
              >
                new password
              </label>
              <input
                placeholder="enter new password"
                type="password"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                style={{ border: `1px solid ${bordercolor}` }}
                onChange={(e) => setNewpassword(e.target.value)}
                value={newpassword}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="newPassword"
              >
                confirm password
              </label>
              <input
                placeholder="enter confirm password"
                type="password"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                style={{ border: `1px solid ${bordercolor}` }}
                onChange={(e) => setConfirmpassword(e.target.value)}
                value={confirmpassword}
              />
            </div>
            <button
              className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 hover:bg-[#e64323] cursor-pointer`}
              style={{ backgroundColor: primaryColor, color: "white" }}
              onClick={resetPassword}
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} className="text-green-500"/> : "reset password"}
            </button>
            {err && (
              <p className="text-rose-500 text-center my-[10px]">*{err}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
