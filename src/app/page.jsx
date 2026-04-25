"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/app/images/logo.png";
import { BiUser } from "react-icons/bi";
import { CgPassword } from "react-icons/cg";
import Link from "next/link";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      setLoading(false);
      toast.success("User loggedIn successfully.");
      router.push("/pages/home");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-300 flex justify-center items-center p-4">
      {/* MAIN BOX */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row rounded-lg h-auto md:h-[90%] bg-gradient-to-r from-gray-900 to-white">
        {/* LEFT SIDE */}
        <div className="w-full md:w-[60%] rounded-t-lg md:rounded-l-lg md:rounded-tr-none h-auto md:h-full bg-gradient-to-r from-gray-900 to-red-900 flex flex-col items-center shadow-lg py-10 px-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 relative overflow-hidden">
            <Image src={logo} alt="logo.png" fill sizes="80px" />
          </div>

          <h2 className="font-black text-lg sm:text-xl mt-4 text-white text-center">
            About Web-Store
          </h2>

          <p className="text-center w-full sm:w-[90%] mt-2 text-gray-400 text-sm sm:text-base">
            Our web-store is a dedicated platform for students who want to learn
            web development from beginner to advanced level. We focus only on
            practical learning, where students not only understand concepts but
            also build real projects. This platform is designed to help you grow
            step by step — from basic HTML to full stack development using
            modern technologies.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col items-center w-full md:w-[40%] justify-center rounded-b-lg md:rounded-r-lg md:rounded-bl-none p-6">
          <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-black to-red-500 bg-clip-text text-transparent">
            User Login
          </h1>

          <form
            onSubmit={handleLogin}
            className="mt-8 w-full flex flex-col gap-4"
          >
            {/* EMAIL */}
            <div className="w-full flex items-center shadow-lg p-2 rounded-lg bg-white">
              <BiUser />
              <input
                type="email"
                placeholder="Email.."
                className="w-full px-2 outline-none text-sm sm:text-base"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div className="w-full flex items-center shadow-lg p-2 rounded-lg bg-white">
              <CgPassword />
              <input
                type="password"
                placeholder="Password.."
                className="w-full px-2 outline-none text-sm sm:text-base"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* LINK */}
            <Link
              href={"/pages/signup"}
              className="text-sm text-center text-gray-600"
            >
              Dont have account?{" "}
              <span className="text-blue-500 underline">SignUp!</span>
            </Link>

            {/* BUTTON */}
            <button className="w-full px-6 py-2 bg-gradient-to-r from-black to-red-500 text-white font-medium rounded-lg mt-2">
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
