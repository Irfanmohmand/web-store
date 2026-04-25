"use client";

import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900  to-red-950 text-white">
      {/* 🔥 HERO */}
      <section className="text-center py-24 px-6">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">
          Learn Web Development from Zero to Full Stack
        </h1>

        <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Start with HTML, CSS, and JavaScript — and become a professional Full
          Stack Developer with real-world projects.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="https://wa.me/923465979993"
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition"
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
      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          What You Will Learn
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
          <div className="hover:scale-105 transition">
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

          <div className="hover:scale-105 transition">
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

          <div className="hover:scale-105 transition">
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

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="hover:scale-105 transition">Portfolio Website</div>
          <div className="hover:scale-105 transition">E-commerce Website</div>
          <div className="hover:scale-105 transition">Course Platform</div>
        </div>
      </section>

      {/* 🎯 WHY ME */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Learn From Me</h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-gray-300">
          <p>✔ Beginner-friendly teaching</p>
          <p>✔ Real-world projects</p>
          <p>✔ Step-by-step roadmap</p>
          <p>✔ WhatsApp support</p>
        </div>
      </section>

      {/* 📢 CTA */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Start Your Journey Today</h2>

        <p className="text-gray-300 mb-8">
          Become a Full Stack Developer — even if you are a beginner.
        </p>

        <Link
          href="https://wa.me/923465979993"
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 transition"
        >
          <BsWhatsapp /> Join via WhatsApp
        </Link>
      </section>
    </div>
  );
}
