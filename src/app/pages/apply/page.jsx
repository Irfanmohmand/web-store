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

    try {
      const result = await axios.post("/api/admission", {
        name,
        whatsapp,
        course,
        level,
        availability,
        goal,
      });

      toast.success(result.data.message);

      setName("");
      setWhatsapp("");
      setCourse("");
      setLevel("");
      setAvailability("");
      setGoal("");

      router.push("/pages/home");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gradient-to-br from-black via-[#0b0f19] to-red-900 text-white">
      {/* FORM BOX */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow-lg">
        {/* LOGO */}
        <div className="w-16 h-16 mx-auto relative mb-4">
          <Image src={logo} fill sizes="64px" alt="logo" />
        </div>

        <h2 className="text-center text-xl font-bold mb-4 bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
          Reserve Your Seat
        </h2>

        {/* FORM */}
        <form onSubmit={handleApply} className="flex flex-col gap-3 text-sm">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Your Name"
            className="bg-white/10 px-3 py-2 rounded-lg outline-none"
          />

          <input
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            type="number"
            placeholder="WhatsApp Number"
            className="bg-white/10 px-3 py-2 rounded-lg outline-none"
          />

          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="bg-white/10 px-3 py-2 rounded-lg outline-none"
          >
            <option value="" className="text-black">
              Select Course
            </option>
            <option value="html" className="text-black">
              Frontend
            </option>
            <option value="css" className="text-black">
              React
            </option>
            <option value="javascript" className="text-black">
              NextJs
            </option>
            <option value="react" className="text-black">
              MongoDB
            </option>
          </select>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="bg-white/10 px-3 py-2 rounded-lg outline-none"
          >
            <option value="">Select Level</option>
            <option value="beginner" className="text-black">
              Beginner
            </option>
            <option value="intermediate" className="text-black">
              Intermediate
            </option>
            <option value="advanced" className="text-black">
              Advanced
            </option>
          </select>

          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="bg-white/10  px-3 py-2 rounded-lg outline-none"
          >
            <option value="" className="text-white">
              Availability
            </option>
            <option value="morning" className="text-black">
              Morning
            </option>
            <option value="afternoon" className="text-black">
              Afternoon
            </option>
            <option value="evening" className="text-black">
              Evening
            </option>
          </select>

          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Your Goal"
            rows={4}
            className="bg-white/10 px-3 py-2 rounded-lg outline-none resize-none"
          ></textarea>

          <button className="mt-2 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default Apply;
