"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const params = useSearchParams();

  const verify = async () => {
    try {
      const token = params.get("token");
      const res = await axios.get(`/api/verify-email?token=${token}`);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <>
      <div className="verify flex justify-center bg-gray-600 flex-col gap-4 items-center w-full h-screen">
        <h1 className="text-3xl text-white font-black ">
          Please click to verify your email...
        </h1>
        <button
          onClick={() => verify()}
          className="px-12 font-bold py-2 bg-blue-700 rounded-lg text-white cursor-pointer "
        >
          Verify
        </button>
      </div>
    </>
  );
};

export default VerifyEmail;
