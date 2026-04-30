import Link from "next/link";
import React from "react";
import { CgFacebook } from "react-icons/cg";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-900 to-red-900 text-white">
      {/* ================= CONTAINER ================= */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* ================= GRID LAYOUT ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* ================= RATING ================= */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-lg font-bold mb-3">Rating</h2>

            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-2xl">★ ★ ★ ★ ☆</span>
              <span className="text-gray-300 text-sm">4.5 / 5</span>
            </div>
          </div>

          {/* ================= CONTACT ================= */}
          <div>
            <h2 className="text-lg font-bold mb-3">Contact</h2>

            <ul className="space-y-2 text-sm text-gray-200">
              <li>Email: irfanmohmand987@gmail.com</li>
              <li>Phone: 03465979993</li>
            </ul>
          </div>

          {/* ================= SOCIAL LINKS ================= */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-lg font-bold mb-3">Links</h2>

            <div className="flex gap-3">
              {/* GitHub */}
              <Link
                href="https://github.com/Irfanmohmand"
                target="_blank"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition"
              >
                <FaGithub className="text-black text-lg" />
              </Link>

              {/* LinkedIn */}
              <Link
                href="https://www.linkedin.com/in/irfan-mohmand/"
                target="_blank"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition"
              >
                <FaLinkedin className="text-black text-lg" />
              </Link>

              {/* Facebook */}
              <Link
                href="https://www.facebook.com/sunny.irfan.79"
                target="_blank"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition"
              >
                <CgFacebook className="text-black text-lg" />
              </Link>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM TEXT ================= */}
        <div className="text-center text-gray-400 text-sm mt-10 border-t border-gray-700 pt-5">
          © 2026 Web-Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
