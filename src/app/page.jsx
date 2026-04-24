import Image from "next/image";
import React from "react";
import logo from "@/app/images/logo.png";
import { BiUser } from "react-icons/bi";
import { CgPassword } from "react-icons/cg";
import Link from "next/link";

const home = () => {
  return (
    <div className="w-full h-screen bg-gray-300 flex  justify-center items-center ">
      <div className="w-[80%] flex  rounded-lg h-[90%] bg-gradient-to-r from-gray-900 to-white ">
        <div className="w-[60%] rounded-lg h-full bg-gradient-to-r from-gray-900 to-red-900 flex flex-col items-center shadow-lg ">
          <div className="imgBox w-20 h-20 relative overflow-hidden">
            <Image src={logo} alt="logo.png" fill loading="eager" sizes={80} />
          </div>
          <h2 className="font-black text-xl mt-6 text-white ">
            About Web-Store
          </h2>
          <p className="text-center w-[90%] mt-2 text-gray-400">
            Our web-store is a dedicated platform for students who want to learn
            web development from beginner to advanced level. We focus only on
            practical learning, where students not only understand concepts but
            also build real projects. This platform is designed to help you grow
            step by step — from basic HTML to full stack development using
            modern technologies.
          </p>
        </div>

        <div className="flex flex-col items-center w-[40%] justify-center rounded-lg ">
          <h1 className="text-2xl font-black bg-gradient-to-r from-black to-red-500 bg-clip-text text-transparent ">
            User Login
          </h1>

          <form action="" className="mt-10 flex flex-col gap-4">
            <div className="w-[120%] px-2 flex justify-center items-center  shadow-lg p-2 rounded-lg">
              <BiUser />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email.."
                className="w-full px-2 outline-none"
              />
            </div>
            <div className="w-[120%] px-2 flex justify-center items-center  shadow-lg p-2 rounded-lg">
              <CgPassword />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password.."
                className="w-full px-2 outline-none"
              />
            </div>
            <Link
              href={"/pages/signup"}
              className="text-sm text-center text-gray-600"
            >
              Dont have account?{" "}
              <span className="pl-20 text-blue-500 underline">SignUp!</span>
            </Link>

            <button className="px-6 py-2 bg-gradient-to-r from-black to-red-500 text-white font-medium rounded-lg mt-4 cursor-pointer">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default home;
