"use client";

import Link from "next/link";
import React, { useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import Image from "next/image";
import { useSession } from "next-auth/react";

import CourseList from "@/app/components/CourseList";

const HomePageAfterLogin = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full  bg-[#0b0f19] text-white">
      {/* 👋 WELCOME */}
      <div className="px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center gap-4 animate-fadeIn">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-red-500">
          {session?.user?.file && (
            <Image
              src={session.user.file}
              alt="profile"
              width={80}
              height={80}
              className="object-cover"
            />
          )}
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-center sm:text-left">
          Welcome back,{" "}
          <span className="text-red-400">{session?.user?.name}</span>
        </h2>
      </div>

      {/* 📚 COURSES */}
      <div className="px-4 sm:px-6 pb-10">
        <CourseList />
      </div>
    </div>
  );
};

export default HomePageAfterLogin;
