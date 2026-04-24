"use client";

import Link from "next/link";
import React, { useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import logo from "@/app/images/logo.png";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { BiSearch } from "react-icons/bi";
import CourseList from "@/app/components/CourseList";

const HomePageAfterLogin = () => {
  const [headerShow, setHeaderShow] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const { data: session } = useSession();
  // console.log(session?.user?.role);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/pages/signin" });
    toast.success("Logout successfully.");
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      {/* 🔥 TOP BANNER */}
      {headerShow && (
        <div className="flex items-center justify-between px-4 py-2 text-sm font-semibold bg-blue-200 animate-fadeIn">
          <div className="flex items-center gap-2">
            <span>Get started with personal plan</span>
            <Link href="https://wa.me/923465979993">
              <BsWhatsapp />
            </Link>
          </div>

          <button onClick={() => setHeaderShow(false)}>
            <CgClose />
          </button>
        </div>
      )}

      {/* 🚀 NAVBAR */}
      <div className="px-4 sm:px-8 py-4 flex items-center justify-between bg-white shadow-sm">
        {/* LOGO */}
        <div className="w-12 h-12 relative">
          <Image src={logo} alt="logo" fill loading="eager" />
        </div>

        {/* NAV LINKS */}
        <div className="hidden md:flex gap-8 font-medium text-gray-700">
          <Link href="/pages/home" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/pages/about" className="hover:text-blue-600 transition">
            About
          </Link>
          <Link
            href="/pages/services"
            className="hover:text-blue-600 transition"
          >
            Services
          </Link>
          <Link
            href="/pages/instructor"
            className="hover:text-blue-600 transition"
          >
            Instructor
          </Link>
          <Link href="/pages/apply" className="hover:text-blue-600 transition">
            Apply Now!
          </Link>
        </div>

        {/* SEARCH */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 border rounded-full">
          <BiSearch />
          <input
            type="text"
            placeholder="Search"
            className="outline-none text-sm"
          />
        </div>

        {/* PROFILE */}
        <div className="relative">
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="w-9 h-9 rounded-full overflow-hidden cursor-pointer bg-black"
          >
            {session?.user?.file && (
              <Image
                src={session.user.file}
                alt="profile"
                width={40}
                height={40}
                className="object-cover"
                loading="eager"
              />
            )}
          </div>

          {/* DROPDOWN */}
          {session?.user?.role === "admin" ? (
            <div
              className={`absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border transition-all duration-300 ${
                showProfile
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2 pointer-events-none"
              }`}
            >
              <div className="p-4 border-b">
                <h2 className="font-semibold">{session?.user?.name}</h2>
                <p className="text-xs text-gray-500">{session?.user?.email}</p>
              </div>

              <div className="p-3 flex flex-col gap-2 text-sm">
                <Link href="/pages/addCourse">Add Course</Link>
                <Link href="/pages/getUsers">Get Users</Link>
                <Link href="/pages/editProfile">Edit Profile</Link>
              </div>

              <button
                onClick={handleLogout}
                className="w-full text-left p-3 text-sm font-semibold border-t hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          ) : (
            <div
              className={`absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border transition-all duration-300 ${
                showProfile
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2 pointer-events-none"
              }`}
            >
              <div className="p-4 border-b">
                <h2 className="font-semibold">{session?.user?.name}</h2>
                <p className="text-xs text-gray-500">{session?.user?.email}</p>
              </div>

              <div className="p-3 flex flex-col gap-2 text-sm">
                <Link href="/pages/courses">Courses</Link>
                <Link href="/pages/editProfile">Edit Profile</Link>
              </div>

              <button
                onClick={handleLogout}
                className="w-full text-left p-3 text-sm font-semibold border-t hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 👋 WELCOME */}
      <div className="px-6 py-6 flex items-center gap-4 animate-fadeIn">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          {session?.user?.file && (
            <Image
              src={session.user.file}
              alt="profile"
              width={80}
              height={80}
              className="object-cover"
              loading="eager"
            />
          )}
        </div>

        <h2 className="text-xl font-bold">
          Welcome back, {session?.user?.name}
        </h2>
      </div>

      {/* 📚 COURSES */}
      <div className="px-6 pb-10 animate-fadeIn">
        <CourseList />
      </div>
    </div>
  );
};

export default HomePageAfterLogin;
