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
  const session = useSession();
  console.log(session);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/pages/signin" });
    toast.success("Logout successfully.");
  };

  const handleProfile = () => {
    if (showProfile) {
      setShowProfile(false);
    } else {
      setShowProfile(true);
    }
  };

  return (
    <>
      <div className="w-full  bg-gray-100 py-2 ">
        {/* TOP BANNER */}
        {headerShow && (
          <header className="flex flex-col sm:flex-row items-center justify-between gap-2 px-3 py-2 text-sm font-bold bg-blue-200">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <h2 className="text-xs sm:text-sm">
                Get started with personal plan |
              </h2>
              <Link href="https://wa.me/03465979993">
                <BsWhatsapp />
              </Link>
            </div>

            <button
              onClick={() => setHeaderShow(false)}
              className="text-xl font-bold"
            >
              <CgClose />
            </button>
          </header>
        )}

        {/* NAVBAR */}
        <div className="px-3 sm:px-6">
          <header className="flex flex-wrap items-center justify-between gap-3 py-3">
            {/* LOGO */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 relative">
              <Image src={logo} alt="logo" fill sizes="56px" />
            </div>

            {/* MENU (hidden on small screens) */}
            <div className="hidden md:flex gap-8 text-gray-800 text-sm">
              <button>Html</button>
              <button>Css</button>
            </div>

            {/* SEARCH (hidden on mobile) */}
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 border border-gray-400 rounded-full">
              <BiSearch className="text-gray-800" />
              <input
                type="search"
                placeholder="Search for anything"
                className="outline-none text-sm"
              />
            </div>

            {/* SKILLS (hidden on small screens) */}
            <div className="hidden lg:flex gap-4 text-gray-800 text-sm">
              <button>JavaScript</button>
              <button>Bootstrap</button>
              <button>Tailwind</button>
            </div>

            {/* PROFILE */}
            <div className="relative">
              <div
                onClick={() => handleProfile()}
                className="w-8 h-8 sm:w-9 sm:h-9 relative overflow-hidden bg-black rounded-full cursor-pointer"
              >
                {session.data?.user?.file ? (
                  <Image
                    src={session.data.user.file}
                    alt="img"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                ) : (
                  <div />
                )}
              </div>

              {/* DROPDOWN */}
              <div className="absolute right-0 top-10 z-50">
                <div
                  className={`w-56 sm:w-60 bg-white shadow-md border rounded-lg transition-all duration-300 ${
                    showProfile
                      ? "opacity-100 translate-y-2"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  {/* USER INFO */}
                  <div className="flex items-center gap-3 p-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 relative overflow-hidden rounded-full">
                      {session.data?.user?.file ? (
                        <Image
                          src={session.data.user.file}
                          alt="img"
                          fill
                          sizes="50px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>

                    <div>
                      <h2 className="font-bold text-sm">
                        {session.data?.user?.name}
                      </h2>
                      <p className="text-xs text-gray-800">
                        {session.data?.user?.email}
                      </p>
                    </div>
                  </div>

                  <hr />

                  {/* Setup admin and user */}
                  {session?.data?.user.role === "admin" ? (
                    <div className="adminLinks flex flex-col gap-2 mt-2 mx-2 mb-2">
                      <Link href={"/pages/addCourse"}>Add Courses</Link>
                      <Link href={"/pages/deleteCourse"}>Delete Courses</Link>
                      <Link href={"/pages/editCourse"}>Edit Courses</Link>
                    </div>
                  ) : (
                    <div className="flex flex-col text-sm p-3 gap-2">
                      <Link
                        className="text-md text-black"
                        href="/pages/notifications"
                      >
                        Notifications
                      </Link>
                      <Link
                        className="text-md text-black"
                        href="/pages/courses"
                      >
                        Courses
                      </Link>
                      <Link
                        className="text-md text-black"
                        href="/pages/editProfile"
                      >
                        Edit Profile
                      </Link>
                    </div>
                  )}

                  <hr />

                  <button
                    onClick={handleLogout}
                    className="w-full text-left p-3 text-sm font-bold"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* CATEGORY BAR (scrollable on mobile) */}
          <header className="flex gap-4 overflow-x-auto whitespace-nowrap py-3 text-gray-800 text-sm scrollbar-hide">
            <button>ReactJs</button>
            <button>NodeJs</button>
            <button>ExpressJs</button>
            <button>NextJs</button>
            <button>MongoDb</button>
            <button>Cloudinary</button>
            <button>Auth</button>
            <button>More</button>
          </header>

          {/* MAIN */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 relative rounded-full overflow-hidden">
              {session.data?.user?.file ? (
                <Image
                  src={session.data.user.file}
                  alt="img"
                  fill
                  sizes="80px"
                  priority
                  className="object-cover"
                />
              ) : null}
            </div>

            <h2 className="font-black text-black text-lg sm:text-2xl text-center sm:text-left">
              Welcome back, {session.data?.user?.name}
            </h2>
          </div>
          <CourseList />
        </div>
      </div>
    </>
  );
};

export default HomePageAfterLogin;
