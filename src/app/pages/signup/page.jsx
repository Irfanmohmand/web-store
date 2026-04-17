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
      if (file) {
        formData.append("file", file);
      }
      // console.log(file);

      const res = await axios.post("/api/auth/signup", formData);

      // console.log(res);

      if (res) {
        toast.success(res.data.message);
        router.push("/pages/signin");
      }

      setLoading(false);
      setName("");
      setContact("");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-300 flex justify-center items-center ">
      <div
        className={`formBox w-[50%] h-[90%] bg-white rounded-xl overflow-hidden flex`}
      >
        <div className="formBoxWithContent w-[60%] h-full flex flex-col items-center gap-2 mt-4 bg-white  ">
          <h1 className="font-black">SignUp With</h1>
          <div className="googleIcon border-1 border-blue-500 p-2 rounded-lg ">
            <BsGoogle className="text-blue-500" />
          </div>
          <p className="font-black">OR</p>
          <h2 className="text-sm text-gray-500 font-semibold ">
            SignUp with your email & password
          </h2>

          <form
            onSubmit={handleSignUp}
            action=""
            className="flex mt-2 flex-col gap-4"
          >
            <div className="leading-4">
              <label
                htmlFor=""
                className="text-sm text-gray-500 font-semibold "
              >
                Name
              </label>{" "}
              <br />
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                name="name"
                className="border-gray-400 border-b-2 outline-none w-full text-sm text-gray-500 "
                value={name}
              />
            </div>
            <div className="leading-4">
              <label
                htmlFor=""
                className="text-sm text-gray-500 font-semibold "
              >
                File
              </label>
              <br />
              <input
                onChange={handleImage}
                type="file"
                id="file"
                name="file"
                className="border-gray-400 border-b-2 outline-none text-sm w-full text-sm text-gray-500 text-gray-400"
              />
            </div>
            <div className="leading-4">
              <label
                htmlFor=""
                className="text-sm text-gray-500 font-semibold "
              >
                Contact
              </label>
              <br />
              <input
                onChange={(e) => setContact(e.target.value)}
                type="text"
                id="contact"
                name="contact"
                className="border-gray-400 border-b-2 outline-none w-full text-sm text-gray-500"
                value={contact}
              />
            </div>
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
              {loading ? "Loading" : "SignIn"}
            </button>
          </form>
        </div>
        <div className="contentBox flex justify-center items-center w-[40%] h-full bg-blue-500 rounded-l-4xl ">
          <Link
            className="border-b-1 border-amber-50 text-white "
            href={"/pages/signin"}
          >
            SignIn
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
