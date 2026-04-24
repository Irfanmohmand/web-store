"use client";

import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";

export default function Home() {
  return (
    <div className="bg-[#0b0f19] text-white">
      {/* 🔥 HERO SECTION */}
      <section className="text-center py-24 px-6 bg-gradient-to-r from-indigo-900 via-purple-900 to-black">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Learn Web Development from Zero to Full Stack
        </h1>

        <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Start with HTML, CSS, and JavaScript — and become a professional Full
          Stack Developer with real-world projects.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="https://wa.me/923465979993"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition shadow-lg shadow-green-500/20"
          >
            <BsWhatsapp /> Join Now
          </Link>

          <button className="border border-gray-500 px-6 py-3 rounded-xl hover:bg-white hover:text-black transition">
            Start Learning
          </button>
        </div>
      </section>

      {/* 💡 NO EXPERIENCE */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">No Experience? No Problem</h2>
        <p className="max-w-2xl mx-auto text-gray-400">
          You don’t need any coding background. Everything is taught step by
          step from basics to advanced level.
        </p>
      </section>

      {/* 📚 LEARNING PATH */}
      <section className="py-20 px-6 bg-[#0f172a]">
        <h2 className="text-3xl font-bold text-center mb-12">
          What You Will Learn
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Beginner */}
          <div className="p-6 bg-[#111827] rounded-2xl border border-gray-800 hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-4 text-green-400">
              Beginner
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>HTML5</li>
              <li>CSS3</li>
              <li>Responsive Design</li>
              <li>JavaScript Basics</li>
            </ul>
          </div>

          {/* Intermediate */}
          <div className="p-6 bg-[#111827] rounded-2xl border border-gray-800 hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">
              Intermediate
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>React.js</li>
              <li>Tailwind CSS</li>
              <li>Git & GitHub</li>
              <li>API Integration</li>
            </ul>
          </div>

          {/* Advanced */}
          <div className="p-6 bg-[#111827] rounded-2xl border border-gray-800 hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-4 text-red-400">
              Advanced
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>Next.js</li>
              <li>Node.js & Express</li>
              <li>MongoDB</li>
              <li>Authentication & Payments</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 🚀 PROJECTS */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">
          Real Projects You Will Build
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 bg-[#111827] rounded-xl border border-gray-800 hover:shadow-lg hover:shadow-purple-500/10 transition">
            Portfolio Website
          </div>

          <div className="p-6 bg-[#111827] rounded-xl border border-gray-800 hover:shadow-lg hover:shadow-purple-500/10 transition">
            E-commerce Website
          </div>

          <div className="p-6 bg-[#111827] rounded-xl border border-gray-800 hover:shadow-lg hover:shadow-purple-500/10 transition">
            Course Platform
          </div>
        </div>
      </section>

      {/* 🎯 WHY ME */}
      <section className="py-20 px-6 text-center bg-[#0f172a]">
        <h2 className="text-3xl font-bold mb-8">Why Learn From Me</h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-gray-300">
          <p>✔ Beginner-friendly teaching</p>
          <p>✔ Real-world projects</p>
          <p>✔ Step-by-step roadmap</p>
          <p>✔ WhatsApp support</p>
        </div>
      </section>

      {/* 📢 CTA */}
      <section className="py-24 px-6 text-center bg-gradient-to-r from-purple-900 to-black">
        <h2 className="text-3xl font-bold mb-4">Start Your Journey Today</h2>

        <p className="text-gray-300 mb-8">
          Become a Full Stack Developer — even if you are a beginner.
        </p>

        <Link
          href="https://wa.me/923465979993"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 transition shadow-lg shadow-green-500/20"
        >
          <BsWhatsapp /> Join via WhatsApp
        </Link>
      </section>
    </div>
  );
}
