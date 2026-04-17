"use client";

import React, { useEffect, useState } from "react";
import { BsGoogle } from "react-icons/bs";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleSignIn = async (e) => {
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

      toast.success("User logged in successfully.");
      router.push("/pages/dashboard");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-300 flex justify-center items-center p-4">
      {/* MAIN BOX */}
      <div className="w-full max-w-4xl bg-white rounded-xl overflow-hidden flex flex-col md:flex-row shadow-lg">
        {/* LEFT FORM */}
        <div className="w-full md:w-[60%] p-6 flex flex-col items-center gap-3">
          <h1 className="font-black text-lg md:text-xl">Sign In With</h1>

          <div className="border border-blue-500 p-2 rounded-lg">
            <BsGoogle className="text-blue-500" />
          </div>

          <p className="font-black">OR</p>

          <h2 className="text-sm text-gray-500 text-center">
            SignIn with your email & password
          </h2>

          {/* FORM */}
          <form
            onSubmit={handleSignIn}
            className="w-full flex flex-col gap-4 mt-3"
          >
            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full border-b border-gray-400 outline-none text-sm py-1"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-gray-500">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full border-b border-gray-400 outline-none text-sm py-1"
              />
            </div>

            {/* BUTTON */}
            <button className="w-full bg-blue-500 hover:bg-blue-400 transition py-2 text-white rounded-lg text-sm">
              Sign In
            </button>
          </form>
        </div>

        {/* RIGHT PANEL (hidden on mobile) */}
        <div className="hidden md:flex w-[40%] bg-blue-500 items-center justify-center p-6">
          <Link
            href="/pages/signup"
            className="text-white border-b border-white"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
