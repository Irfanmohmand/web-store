"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const params = useSearchParams();

  useEffect(() => {
    const verify = async () => {
      try {
        const token = params.get("token");
        const res = await axios.get(`/api/verify-email?token=${token}`);
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };

    verify();
  }, []);

  return (
    <h1 className="font-black text-center text-white text-2xl ">
      Verifying...
    </h1>
  );
};

export default VerifyEmail;
