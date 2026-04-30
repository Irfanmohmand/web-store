"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/images/logo.png";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [shortDes, setShortDes] = useState("");
  const [fullDes, setFullDes] = useState("");
  const [bulletPonint, setBulletPoints] = useState("");
  const [requirements, setRequirements] = useState("");
  const [file, setFile] = useState("");
  const [courseCon, setCourseCon] = useState("");
  const [price, setPrice] = useState("");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const imgHandle = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setFile(files[0]);
  };

  const handleSubmitCourse = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // convert to array
      const bulletArray = bulletPonint.split("\n");
      const reqArray = requirements.split("\n");
      const courseArray = courseCon.split("\n");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("shortDes", shortDes);
      formData.append("fullDes", fullDes);
      formData.append("price", price);

      //  Send as JSON string
      formData.append("bulletPoints", JSON.stringify(bulletArray));
      formData.append("requirements", JSON.stringify(reqArray));
      formData.append("courseCon", JSON.stringify(courseArray));

      if (file) formData.append("file", file);

      const res = await axios.post("/api/addCourse", formData);

      toast.success(res?.data?.message);
      setLoading(false);
      router.push("/home");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-r from-black to-red-950 flex justify-center items-center">
      <div className="formBox flex flex-col items-center w-[30%] py-4 shadow-md bg-gradient-to-r from-gray-500 to-gray-300 rounded-lg ">
        <div className="logoImg w-20 h-20 relative overflow-hidden">
          <Image src={logo} alt="logo.png" fill sizes="80" loading="eager" />
        </div>

        <form
          onSubmit={handleSubmitCourse}
          action=""
          className="flex flex-col w-[90%] gap-4"
        >
          <input
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            id="title"
            placeholder="Title"
            type="text"
            className="shadow-lg bg-gray-500 px-2 text-white py-1 rounded-lg outline-none"
          />
          <input
            onChange={(e) => setShortDes(e.target.value)}
            name="shortDes"
            id="ShortDes"
            placeholder="Short Descriptions"
            type="text"
            className="shadow-lg bg-gray-500 px-2 text-white py-1 rounded-lg outline-none"
          />
          <input
            onChange={(e) => setFullDes(e.target.value)}
            name="fullDes"
            id="fullDes"
            placeholder="Full Descriptions"
            type="text"
            className="shadow-lg bg-gray-500 px-2 text-white py-1 rounded-lg outline-none"
          />
          <input
            onChange={(e) => setBulletPoints(e.target.value)}
            name="bulletPoints"
            id="bulletPoints"
            placeholder="Bullet Points..."
            type="text"
            className="shadow-lg bg-gray-500 px-2 text-white py-1 rounded-lg outline-none"
          />
          <input
            onChange={(e) => setRequirements(e.target.value)}
            name="requirements"
            id="requirements"
            placeholder="Requirements"
            type="text"
            className="shadow-lg bg-gray-500 px-2 text-white py-1 rounded-lg outline-none"
          />
          <input
            onChange={(e) => setCourseCon(e.target.value)}
            name="courseCont"
            id="courseCont"
            placeholder="Course Content"
            type="text"
            className="shadow-lg bg-gray-500 px-2 text-white py-1 rounded-lg outline-none"
          />
          <input
            onChange={imgHandle}
            name="file"
            id="file"
            placeholder="file.."
            type="file"
            className="shadow-lg bg-gray-500 px-2 text-white py-1 rounded-lg outline-none"
          />
          <input
            onChange={(e) => setPrice(e.target.value)}
            name="price"
            id="price"
            placeholder="Price"
            type="number"
            className="shadow-lg bg-gray-500 px-2 text-white py-1 rounded-lg outline-none"
          />

          <button className="w-full outline-none bg-blue-700 text-white font-semibold rounded-lg py-2 cursor-pointer ">
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
