"use client";

import axios from "axios";
import React, { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/images/logo.png";

const SignUp = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleImage = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setFile(files[0]);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("contact", contact);
      formData.append("email", email);
      formData.append("password", password);
      if (file) formData.append("file", file);

      const res = await axios.post("/api/auth/signup", formData);

      toast.success(res.data.message);
      router.push("/pages/signin");

      setName("");
      setContact("");
      setEmail("");
      setPassword("");
      setFile(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-300 flex justify-center items-center p-4">
      {/* MAIN BOX */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row rounded-lg bg-gradient-to-r from-gray-900 to-white">
        {/* LEFT SIDE (same as login) */}
        <div className="w-full md:w-[60%] bg-gradient-to-r from-gray-900 to-red-900 flex flex-col items-center justify-center p-6 rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
          <div className="w-16 h-16 sm:w-20 sm:h-20 relative">
            <Image src={logo} alt="logo" fill sizes="80px" />
          </div>

          <h2 className="text-white font-black text-lg sm:text-xl mt-4 text-center">
            About Web-Store
          </h2>

          <p className="text-gray-400 text-center mt-2 text-sm sm:text-base max-w-md">
            Our web-store is a dedicated platform for students who want to learn
            web development from beginner to advanced level. We focus only on
            practical learning, where students not only understand concepts but
            also build real projects. This platform is designed to help you grow
            step by step — from basic HTML to full stack development using
            modern technologies.
          </p>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className="w-full md:w-[40%] flex flex-col justify-center items-center p-6 rounded-b-lg md:rounded-r-lg md:rounded-bl-none">
          <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-black to-red-500 bg-clip-text text-transparent">
            User SignUp
          </h1>

          <form
            onSubmit={handleSignUp}
            className="w-full flex flex-col gap-4 mt-6"
          >
            {/* NAME */}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full p-2 rounded-lg shadow bg-white outline-none text-sm"
            />

            {/* FILE */}
            <div className="w-full">
              {/* Hidden input */}
              <input
                type="file"
                id="fileUpload"
                onChange={handleImage}
                className="hidden"
              />

              {/* Custom UI */}
              <label
                htmlFor="fileUpload"
                className="w-full p-2 rounded-lg shadow text-gray-500 bg-white text-sm cursor-pointer block"
              >
                {file ? file.name : "upload profile image"}
              </label>
            </div>

            {/* CONTACT */}
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Contact"
              className="w-full p-2 rounded-lg shadow bg-white outline-none text-sm"
            />

            {/* EMAIL */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 rounded-lg shadow bg-white outline-none text-sm"
            />

            {/* PASSWORD */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-2 rounded-lg shadow bg-white outline-none text-sm"
            />

            {/* BUTTON */}
            <button
              disabled={loading}
              className="w-full py-2 bg-gradient-to-r from-black to-red-500 text-white rounded-lg mt-2"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>

            {/* LINK */}
            <Link href={"/"} className="text-center text-gray-600 text-sm">
              Already have account?{" "}
              <span className="text-blue-500 underline">SignIn</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
