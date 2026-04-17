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
  // const session = useSession();
  // console.log(session);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log(result);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("User login successfully.");
      router.push("/pages/dashboard");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-300 flex justify-center items-center ">
      <div className="formBox w-[50%] h-[90%] bg-white rounded-xl overflow-hidden flex ">
        <div className="formBoxWithContent w-[60%] h-full flex flex-col items-center gap-2 mt-4 bg-white  ">
          <h1 className="font-black">SignIn With</h1>
          <div className="googleIcon border-1 border-blue-500 p-2 rounded-lg ">
            <BsGoogle className="text-blue-500" />
          </div>
          <p className="font-black">OR</p>
          <h2 className="text-sm text-gray-500 font-semibold ">
            SignIn with your email & password
          </h2>

          <form
            onSubmit={handleSignIn}
            action=""
            className="flex mt-2 flex-col gap-4"
          >
            <div className="leading-4">
              <label className="text-sm text-gray-500 font-semibold" htmlFor="">
                Email
              </label>{" "}
              <br />
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                className="border-gray-400 border-b-2 outline-none w-full text-sm text-gray-500 "
                value={email}
              />
            </div>
            <div className="leading-4">
              <label
                htmlFor=""
                className="text-sm text-gray-500 font-semibold "
              >
                Password
              </label>
              <br />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                className=" text-sm border-gray-400 border-b-2 w-full text-gray-500"
                value={password}
              />
            </div>

            <button className="w-full bg-blue-500 hover:bg-blue-400 transition-colors duration-300 cursor-pointer rounded-lg text-sm py-2 text-white ">
              SignIn
            </button>
          </form>
        </div>
        <div className="contentBox w-[40%] flex justify-center items-center h-full bg-blue-500 rounded-l-4xl ">
          <Link
            className="text-white border-b-1 border-amber-50"
            href={"/pages/signup"}
          >
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
