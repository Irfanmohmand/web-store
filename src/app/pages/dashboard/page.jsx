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

const HomePageAfterLogin = () => {
  const [headerShow, setHeaderShow] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const session = useSession();
  // console.log(session);

  // handleLogout with show message
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/pages/signin" });
    toast.success("Logout successfully.");
  };

  return (
    <div className="w-full h-screen bg-gray-100 ">
      {headerShow && (
        <header className="flex  items-center gap-2 justify-between h-14 font-bold bg-blue-200 ">
          <div className="flex justify-center items-center mx-110 gap-2">
            <h2>Get started with personal plane | </h2>
            <Link href={"https://wa.me/03465979993"}>
              <BsWhatsapp />{" "}
            </Link>{" "}
          </div>

          <div className="mx-6 ">
            <button
              onClick={() => setHeaderShow(false)}
              className="text-xl font-bold cursor-pointer"
            >
              <CgClose />
            </button>
          </div>
        </header>
      )}

      <div className="headers">
        <header className="header1 px-2 flex justify-between items-center mx-6">
          <div className="w-14 h-14 relative overflow-hidden ">
            <Image
              src={logo}
              alt="logo"
              width={56}
              height={56}
              className="object-cover"
            />
          </div>

          <div className="htmlCss flex gap-14 text-gray-500">
            <button>Html</button>
            <button>Css</button>
          </div>

          {/* Input */}
          <div className="search px-6 rounded-4xl flex gap-2 items-center py-2 border-1 border-gray-400 ">
            <BiSearch className="text-gray-400 cursor-no-drop " />
            <input
              type="search"
              name=""
              placeholder="Search for anything"
              id=""
              className=" px-4 outline-none py-1  "
            />
          </div>

          {/* Js Bootstrap Tailwind Css */}
          <div className="jsBotTai flex gap-4 text-gray-500 ">
            <button>JavaScript</button>
            <button>BootStrap</button>
            <button>Tailwind Css</button>
          </div>

          <div className="profile relative">
            <div
              onMouseEnter={() => setShowProfile(true)}
              onMouseLeave={() => setShowProfile(false)}
              className="profileImg cursor-pointer w-8 h-8 relative overflow-hidden bg-black rounded-full"
            >
              {session.data?.user?.file ? (
                <Image
                  src={session.data?.user?.file}
                  alt="img.png"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              ) : (
                <div>
                  <h2>No Image</h2>
                </div>
              )}
            </div>

            <div className="profileContent absolute -mx-58">
              <div
                onMouseEnter={() => setShowProfile(true)}
                onMouseLeave={() => setShowProfile(false)}
                className={`w-60 h-90 shadow-md bg-white border-1 border-gray-200 ${!showProfile ? "translate-y-0 opacity-0" : "translate-y-2 opacity-100"} duration-500 rounded-lg`}
              >
                <div className="profileContent flex justify-center items-center gap-4 mt-2 ">
                  <div className="profileImg w-15 h-15 relative overflow-hidden rounded-full ">
                    {session.data?.user?.file ? (
                      <Image
                        src={session.data?.user?.file}
                        alt="img.png"
                        fill
                        sizes="60px"
                        className="object-cover"
                      />
                    ) : (
                      <div>
                        <h2>No Image</h2>
                      </div>
                    )}
                  </div>
                  <div className="emailContent flex flex-col ">
                    <h2 className="font-bold">
                      {" "}
                      {session.data?.user?.name[0].toUpperCase() +
                        session.data?.user?.name.slice(1)}
                    </h2>
                    <p className="text-gray-500 text-sm ">
                      {" "}
                      {session.data?.user?.email}{" "}
                    </p>
                  </div>
                </div>
                <hr className="border-1 border-gray-300 mt-4  " />

                <div className="contentProfileCourseNoti flex flex-col text-sm gap-5 mt-6 mx-4 ">
                  <Link href={"/pages/notifications"}> Notifications </Link>
                  <Link href={"/pages/courses"}> Courses </Link>
                  <Link href={"/pages/editProfile"}> Edit Profile </Link>
                </div>
                <hr className="border-1 border-gray-300 mt-4  " />

                <button
                  onClick={() => handleLogout()}
                  className="text-sm gap-5 mt-6 mx-4 font-bold cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <hr className="border-1 border-gray-300 mt-4  " />

        <header className="header1 text-gray-500 shadow-md py-3 px-2 flex justify-between items-center mx-6">
          <button>ReactJs</button>
          <button>NodeJs</button>
          <button>ExpressJs</button>
          <button>NextJs</button>
          <button>MongoDb</button>
          <button>Cloudinay</button>
          <button>Authentications</button>
          <button>More</button>
        </header>
      </div>

      <div className="mainPageContent mt-8 flex items-center gap-4 mx-4">
        <div className="mainConImg w-20 h-20 relative  object-cover overflow-hidden rounded-full ">
          {session.data?.user?.file ? (
            <Image
              src={session.data?.user?.file}
              alt="img.png"
              fill
              sizes="80px"
              priority
              className="object-cover"
            />
          ) : (
            <div>
              <h2>No Image</h2>
            </div>
          )}
        </div>

        <h2 className="font-black text-2xl ">
          Welcome back, {session.data?.user?.name}{" "}
        </h2>
      </div>
    </div>
  );
};

export default HomePageAfterLogin;
