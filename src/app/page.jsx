"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import logoImg from "@/app/images/logo.png";
import onlineCourse from "@/app/images/online-course.png";
import Link from "next/link";
import toast from "react-hot-toast";

const Home = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      toast("😌 Be patience, web-store is under construction.");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white min-h-screen px-4 md:px-10 lg:px-20">
      {/* HEADER */}
      <header className="flex items-center py-4">
        <div className="w-16 h-16 md:w-20 md:h-20 relative">
          <Image src={logoImg} alt="logo" fill sizes="80px" />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 mt-10">
        {/* TEXT SECTION */}
        <div className="contentText text-center md:text-left">
          <h1 className="font-black text-3xl md:text-5xl lg:text-6xl leading-tight">
            Learn Skills, <br /> Build Your <br /> Future
          </h1>

          <p className="text-gray-400 mt-3 text-sm md:text-base">
            Join online courses today and unlock your potential for success.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center md:justify-start">
            <Link
              href="/pages/signup"
              className="bg-blue-400 hover:bg-white border border-blue-500 hover:text-blue-500 text-white text-sm py-2 px-8 rounded-lg transition"
            >
              Sign Up
            </Link>

            <Link
              href="/pages/signin"
              className="border border-blue-500 text-blue-500 hover:bg-blue-400 hover:text-white text-sm py-2 px-8 rounded-lg transition"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* IMAGE SECTION */}
        <div className="w-full flex justify-center md:justify-end">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
            <Image
              src={onlineCourse}
              alt="online-course"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
