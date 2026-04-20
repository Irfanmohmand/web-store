"use client";

import axios from "axios";
import React, { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    setLoading(true);
    e.preventDefault();

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
    <div className="w-full min-h-screen bg-gray-300 flex justify-center items-center ">
      {/* MAIN BOX */}
      <div className="max-w-lg bg-white rounded-xl overflow-hidden flex flex-col md:flex-row shadow-lg">
        {/* FORM SECTION */}
        <div className="w-full md:w-[60%] p-6 flex flex-col items-center gap-3">
          <h1 className="font-black text-lg md:text-xl">SignUp With</h1>

          <div className="border border-blue-500 p-2 rounded-lg">
            <BsGoogle className="text-blue-500" />
          </div>

          <p className="font-black">OR</p>

          <h2 className="text-sm text-gray-500 text-center">
            SignUp with your email & password
          </h2>

          {/* FORM */}
          <form
            onSubmit={handleSignUp}
            className="w-full flex flex-col gap-4 mt-3"
          >
            {/* NAME */}
            <div>
              <label className="text-sm text-gray-500">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-b border-gray-400 outline-none text-sm py-1"
              />
            </div>

            {/* FILE */}
            <div>
              <label className="text-sm text-gray-500">File</label>
              <input
                type="file"
                onChange={handleImage}
                className="w-full text-sm text-gray-500"
              />
            </div>

            {/* CONTACT */}
            <div>
              <label className="text-sm text-gray-500">Contact</label>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full border-b border-gray-400 outline-none text-sm py-1"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-gray-400 outline-none text-sm py-1"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-gray-500">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-gray-400 outline-none text-sm py-1"
              />
            </div>

            {/* BUTTON */}
            <button
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-400 transition py-2 text-white rounded-lg text-sm"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
            <Link
              href={"/pages/signin"}
              className="text-center text-blue-600 underline"
            >
              SignIn
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
