"use client";
import Image from "next/image";
import instructor from "@/app/images/instructor.jpeg";
import { useState } from "react";

export default function Portfolio() {
  const [showImg, setShowImg] = useState(false);

  const handleShowImg = () => {
    if (showImg) {
      setShowImg(false);
    } else {
      setShowImg(true);
    }
  };

  console.log(showImg);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0b0f19] to-red-900 text-white">
      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4 sm:px-6">
        <div
          onClick={handleShowImg}
          className={`w-40 h-40 ${showImg ? "w-200 h-250 rounded-lg " : ""} cursor-pointer relative overflow-hidden rounded-full`}
        >
          <Image
            src={instructor}
            fill
            loading="eager"
            alt="Instructor.png"
            sizes="80"
            className="object-cover"
          />
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
          Irfan Ullah
        </h1>

        <p className="mt-3 text-sm sm:text-lg text-gray-300">
          Full Stack Web Developer
        </p>

        <p className="mt-4 max-w-xl text-xs sm:text-sm md:text-base text-gray-400">
          I build modern, responsive, and scalable web applications using React,
          Next.js, Node.js, and MongoDB.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="mailto:irfanmohmand987@gmail.com"
            className="bg-red-600 hover:bg-red-700 px-4 sm:px-5 py-2 rounded-lg text-sm font-semibold transition"
          >
            Contact Me
          </a>

          <a
            href="https://wa.me/923465979993"
            className="border border-gray-600 px-4 sm:px-5 py-2 rounded-lg text-sm hover:bg-white hover:text-black transition"
          >
            WhatsApp
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-16 px-4 sm:px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">About Me</h2>

        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
          I am a passionate Full Stack Web Developer specializing in building
          complete web applications from frontend to backend. I focus on clean
          code, responsive design, and real-world project development using
          modern technologies.
        </p>
      </section>

      {/* SKILLS */}
      <section className="py-16 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
          Skills
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
          <div className="hover:scale-105 transition">
            <h3 className="font-semibold text-red-400 mb-2 text-lg">
              Frontend
            </h3>
            <p className="text-gray-400 text-sm">
              HTML, CSS, JavaScript, React, Next.js, Tailwind CSS
            </p>
          </div>

          <div className="hover:scale-105 transition">
            <h3 className="font-semibold text-red-500 mb-2 text-lg">Backend</h3>
            <p className="text-gray-400 text-sm">
              Node.js, Express.js, REST APIs
            </p>
          </div>

          <div className="hover:scale-105 transition">
            <h3 className="font-semibold text-red-600 mb-2 text-lg">
              Database
            </h3>
            <p className="text-gray-400 text-sm">MongoDB, Mongoose</p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-16 px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Contact</h2>

        <div className="space-y-2 text-gray-400 text-sm sm:text-base">
          <p>
            📧 Email:{" "}
            <a href="mailto:irfanmohmand987@gmail.com" className="text-red-400">
              irfanmohmand987@gmail.com
            </a>
          </p>

          <p>📱 Phone: 03465979993</p>
        </div>

        <div className="mt-6">
          <a
            href="https://wa.me/923465979993"
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg text-sm font-semibold transition"
          >
            Hire Me on WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-5 text-xs sm:text-sm text-gray-500">
        © {new Date().getFullYear()} Irfan Ullah. All rights reserved.
      </footer>
    </div>
  );
}
