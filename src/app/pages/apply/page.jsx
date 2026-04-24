"use client";
import React, { useState } from "react";
import logo from "@/app/images/logo.png";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Apply = () => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [course, setCourse] = useState("");
  const [level, setLevel] = useState("");
  const [availability, setAvailability] = useState("");
  const [goal, setGoal] = useState("");
  const router = useRouter();

  const handleApply = async (e) => {
    e.preventDefault();
    // console.log(name, whatsapp, course, level, availability, goal);

    const result = await axios.post("/api/admission", {
      name,
      whatsapp,
      course,
      level,
      availability,
      goal,
    });

    setName("");
    setWhatsapp("");
    setCourse("");
    setLevel("");
    setAvailability("");
    setGoal("");
    toast.success(result.data.message);
    router.push("/pages/home");
    try {
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="w-full h-screen  flex justify-center items-center ">
      <div className="formBox w-[30%] p-2 rounded-lg bg-gray-100 shadow-lg flex flex-col justify-center items-center ">
        <div className="imgBox w-20 h-20 relative overflow-hidden ">
          <Image src={logo} fill sizes="80" alt="logo.png" loading="eager" />
        </div>

        <form
          onSubmit={handleApply}
          action=""
          className="flex flex-col w-[80%]  gap-2"
        >
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            id="name"
            placeholder="name"
            className="bg-gray-300 px-2 py-1 rounded-lg outline-none shadow-md"
          />
          <input
            onChange={(e) => setWhatsapp(e.target.value)}
            type="number"
            name="whatsapp"
            id="whatsapp"
            placeholder="whatsapp"
            className="bg-gray-300 px-2 py-1 rounded-lg outline-none shadow-md"
          />
          <select
            onChange={(e) => setCourse(e.target.value)}
            name="course"
            id="course"
            className="bg-gray-300 px-2 py-1 rounded-lg outline-none shadow-md"
          >
            <option value="">Course</option>
            <option value="html">Html</option>
            <option value="css">Css</option>
            <option value="javascript">JavaScript</option>
            <option value="react">ReactJs</option>
          </select>

          <select
            onChange={(e) => setLevel(e.target.value)}
            name="level"
            id="level"
            className="bg-gray-300 px-2 py-1 rounded-lg outline-none shadow-md"
          >
            <option value="">Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <select
            onChange={(e) => setAvailability(e.target.value)}
            name="availability"
            id="availability"
            className="bg-gray-300 px-2 py-1 rounded-lg outline-none shadow-md"
          >
            <option value="">Availability</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>

          <textarea
            onChange={(e) => setGoal(e.target.value)}
            name="goal"
            id="goal"
            cols={4}
            rows={6}
            placeholder="goal"
            className="bg-gray-300 px-2 py-1 rounded-lg outline-none shadow-md"
          ></textarea>

          <button className="px-6 py-2 bg-blue-500 rounded-lg text-white cursor-pointer hover:bg-blue-600 ">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Apply;
