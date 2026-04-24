"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";

const Users = () => {
  const [getusers, setGetusers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const result = await axios.get("/api/getUsers");
        console.log(result.data);
        setGetusers(result.data);
        toast.success(result.data?.message);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="w-full h-screen bg-gray-100 ">
      <h1 className="text-center text-black font-black text-2xl mt-2">
        {getusers.message}
      </h1>

      <div className="userBox flex flex-wrap justify-center mt-20 gap-10">
        {getusers?.users?.map((user) => (
          <div
            key={user._id}
            className="shadow-lg w-50 p-2 flex flex-col justify-center items-center "
          >
            <div className="imgBox w-20 h-20 overflow-hidden relative rounded-full ">
              {user.file ? (
                <Image
                  src={user.file}
                  fill
                  alt="user.png"
                  sizes="80"
                  className="object-cover"
                  loading="eager"
                />
              ) : (
                <CgProfile className="w-full h-full" />
              )}
            </div>
            <div className="userContent flex flex-col justify-center items-center gap-2 mt-2">
              <h1 className="text-2xl font-bold text-center "> {user.name} </h1>
              <p className="text-gray-600 font-medium"> {user.email} </p>
              <p className="font-medium text-gray-600"> {user.contact} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
