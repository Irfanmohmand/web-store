import Image from "next/image";
import React from "react";
import logoImg from "@/app/images/logo.png";
import onlineCourse from "@/app/images/online-course.png";
import Link from "next/link";

const Home = () => {
  return (
    <div className="bg-white ">
      <header className="  flex items-center">
        <div className=" w-20 h-20 relative  ">
          <Image sizes="100px" src={logoImg} alt="logo.img" fill />
        </div>
      </header>

      <div className="content w-full  bg-white flex justify-around mt-10 ">
        <div className="contentText">
          <h1 className="font-black text-6xl leading-18 ">
            Learn Skills, <br /> Build Your <br /> Future
          </h1>
          <p className=" text-gray-400 ">
            Join online courses today and unlock your potential for success.
          </p>
          <div className="links flex gap-2 mt-4">
            <Link
              href="/pages/signup"
              className="bg-blue-400 hover:border-1 border-blue-500 hover:bg-white hover:text-blue-500 transition-colors duration-300 text-white text-sm py-2 px-12 rounded-lg "
            >
              Sign Up
            </Link>
            <Link
              href="/pages/signin"
              className="border-1 border-blue-500 text-blue-500 hover:bg-blue-400 transition-colors duration-300 hover:text-white text-sm py-2 px-12 rounded-lg "
            >
              Sign In{" "}
            </Link>
          </div>
        </div>
        <div className="contentImg w-80 h-80 relative ">
          <Image
            sizes="100px"
            src={onlineCourse}
            alt="online-course.png"
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
