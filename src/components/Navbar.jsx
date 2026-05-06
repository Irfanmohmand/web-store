"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BiSearch, BiMenu } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { BsWhatsapp } from "react-icons/bs";
import logo from "@/images/logo.png";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [headerShow, setHeaderShow] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);

  const { data: session, status } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
    toast.success("Logout successfully.");
  };

  return (
    <>
      {/* 🔥 TOP BANNER */}
      {headerShow && (
        <div className="flex flex-col sm:flex-row relative items-center justify-between gap-2 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-red-900 to-black">
          <div className="flex w-full justify-center items-center gap-2  ">
            <span className="text-gray-300 ">
              Get started with personal plan
            </span>
            <Link href="https://wa.me/923465979993">
              <BsWhatsapp className="text-green-400 text-lg" />
            </Link>
          </div>

          <button
            className="text-white cursor-pointer"
            onClick={() => setHeaderShow(false)}
          >
            <CgClose />
          </button>
        </div>
      )}

      {/* 🚀 NAVBAR */}
      {status !== "unauthenticated" && (
        <div className="px-4 sm:px-8 py-4 flex items-center justify-between bg-[#0f172a] shadow-md relative">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden text-white text-2xl"
              onClick={() => setMobileMenu(true)}
            >
              <BiMenu />
            </button>

            {/* LOGO */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 relative">
              <Image src={logo} alt="logo" fill />
            </div>
          </div>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
            <Link className="hover:text-red-400" href="/home">
              Home
            </Link>
            <Link className="hover:text-red-400" href="/about">
              About
            </Link>
            <Link className="hover:text-red-400" href="/services">
              Services
            </Link>
            <Link className="hover:text-red-400" href="/instructor">
              Instructor
            </Link>
            <Link className="hover:text-red-400" href="/apply">
              Reserve Seat
            </Link>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">


            {/* PROFILE */}
            <div className="relative z-10">
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
                  <p className="text-xs text-gray-400">
                    {session?.user?.email}
                  </p>
                </div>

                <div className="p-3 flex flex-col gap-2 text-sm">
                  {session?.user?.role === "admin" ? (
                    <>
                      <Link href="/admin/dashboard">Dashboard</Link>
                      <Link href="/addCourse">Add Course</Link>
                      <Link href="/getUsers">Get Users</Link>
                      <Link href="/editProfile">Edit Profile</Link>
                    </>
                  ) : (
                    <>
                      <Link href="/courses">Courses</Link>
                      <Link href="/favorites">My Favorites</Link>
                      <Link href="/editProfile">Edit Profile</Link>
                      <Link href="/apply">Reserve Your Seat</Link>

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

          {/* 📱 MOBILE MENU */}
          <div
            className={`fixed top-0 left-0 w-64 h-full bg-[#0f172a] text-white z-50 transform transition-transform duration-300 ${
              mobileMenu ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="font-semibold">Menu</h2>
              <button onClick={() => setMobileMenu(false)}>
                <CgClose />
              </button>
            </div>

            <div className="flex flex-col gap-4 p-4 text-sm">
              {/* 🔍 MOBILE SEARCH */}
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-full">
                <BiSearch className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search under construction.."
                  className="bg-transparent outline-none text-sm text-white w-full"
                />
              </div>

              {/* LINKS */}
              <Link href="/home" onClick={() => setMobileMenu(false)}>
                Home
              </Link>
              <Link href="/about" onClick={() => setMobileMenu(false)}>
                About
              </Link>
              <Link href="/services" onClick={() => setMobileMenu(false)}>
                Services
              </Link>
              <Link href="/instructor" onClick={() => setMobileMenu(false)}>
                Instructor
              </Link>
              <Link href="/apply" onClick={() => setMobileMenu(false)}>
                Reserve Seat
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
