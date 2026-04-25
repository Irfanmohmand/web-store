"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import logo from "@/app/images/logo.png";
import { signOut, useSession } from "next-auth/react";
import { CgClose } from "react-icons/cg";
import { BsWhatsapp } from "react-icons/bs";
import toast from "react-hot-toast";

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [headerShow, setHeaderShow] = useState(true);
  const { data: session, status } = useSession();
  // console.log("session", session, status);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
    toast.success("Logout successfully.");
  };

  return (
    <>
      {/* 🔥 TOP BANNER */}
      {headerShow && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-red-900 to-black animate-fadeIn">
          <div className="flex items-center gap-2 text-center">
            <span>Get started with personal plan</span>
            <Link href="https://wa.me/923465979993">
              <BsWhatsapp className="text-green-400" />
            </Link>
          </div>

          <button onClick={() => setHeaderShow(false)}>
            <CgClose />
          </button>
        </div>
      )}
      {/* 🚀 NAVBAR */}
      {status === "unauthenticated" ? (
        ""
      ) : (
        <div className="px-4 sm:px-8 py-4 flex items-center justify-between bg-[#0f172a] shadow-md">
          {/* LOGO */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 relative">
            <Image src={logo} alt="logo" fill />
          </div>

          {/* NAV LINKS */}
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
            <Link className="hover:text-red-400" href="/pages/home">
              Home
            </Link>
            <Link className="hover:text-red-400" href="/pages/about">
              About
            </Link>
            <Link className="hover:text-red-400" href="/pages/services">
              Services
            </Link>
            <Link className="hover:text-red-400" href="/pages/instructor">
              Instructor
            </Link>
            <Link className="hover:text-red-400" href="/pages/apply">
              Reserve Seat
            </Link>
          </div>

          {/* SEARCH */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#111827] rounded-full">
            <BiSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-sm text-white"
            />
          </div>

          {/* PROFILE */}
          <div className="relative">
            <div
              onClick={() => setShowProfile(!showProfile)}
              className="w-9 h-9 rounded-full overflow-hidden cursor-pointer border border-red-500"
            >
              {session?.user?.file && (
                <Image
                  src={session.user.file}
                  alt="profile"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              )}
            </div>

            {/* DROPDOWN */}
            <div
              className={`absolute right-0 mt-2 w-56 bg-[#111827] text-white rounded-xl shadow-lg border border-red-900 transition-all duration-300 ${
                showProfile
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2 pointer-events-none"
              }`}
            >
              <div className="p-4 border-b border-red-900">
                <h2 className="font-semibold">{session?.user?.name}</h2>
                <p className="text-xs text-gray-400">{session?.user?.email}</p>
              </div>

              <div className="p-3 flex flex-col gap-2 text-sm">
                {session?.user?.role === "admin" ? (
                  <>
                    <Link
                      className="hover:text-red-400"
                      href="/pages/addCourse"
                    >
                      Add Course
                    </Link>
                    <Link className="hover:text-red-400" href="/pages/getUsers">
                      Get Users
                    </Link>
                    <Link
                      className="hover:text-red-400"
                      href="/pages/editProfile"
                    >
                      Edit Profile
                    </Link>
                  </>
                ) : (
                  <>
                    <Link className="hover:text-red-400" href="/pages/courses">
                      Courses
                    </Link>
                    <Link
                      className="hover:text-red-400"
                      href="/pages/editProfile"
                    >
                      Edit Profile
                    </Link>
                  </>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="w-full text-left p-3 text-sm font-semibold border-t border-red-900 hover:bg-red-900/20"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
