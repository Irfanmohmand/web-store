"use client";

import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import CourseList from "@/components/CourseList";

const HomePageAfterLogin = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full min-h-screen bg-gray-50 text-black">
      {/* ================= WELCOME SECTION ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 bg-white p-4 sm:p-5 rounded-xl shadow-sm">
          {/* PROFILE IMAGE */}
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border border-red-500 flex-shrink-0">
            {session?.user?.file && (
              <Image
                src={session.user.file}
                alt="profile"
                width={80}
                height={80}
                className="object-cover w-full h-full"
                loading="eager"
              />
            )}
          </div>

          {/* TEXT */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center sm:text-left">
            Welcome back,{" "}
            <span className="text-red-500">{session?.user?.name}</span>
          </h2>
        </div>
      </div>

      {/* ================= COURSES SECTION ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-12">
        {/* Optional heading */}
        <h2 className="text-xl sm:text-2xl font-bold mb-5 text-gray-800">
          Your Courses
        </h2>

        {/* Course List */}
        <CourseList />
      </div>
    </div>
  );
};

export default HomePageAfterLogin;
