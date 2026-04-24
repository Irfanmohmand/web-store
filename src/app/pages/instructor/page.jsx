export default function Portfolio() {
  return (
    <div className="bg-[#0b0f19] text-white min-h-screen">
      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-r from-indigo-900 via-purple-900 to-black">
        <h1 className="text-4xl md:text-6xl font-bold">Irfan Ullah</h1>

        <p className="mt-4 text-lg md:text-xl text-gray-300">
          Full Stack Web Developer
        </p>

        <p className="mt-4 max-w-xl text-sm md:text-base text-gray-400">
          I build modern, responsive, and scalable web applications using React,
          Next.js, Node.js, and MongoDB.
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="mailto:irfanmohmand987@gmail.com"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold transition shadow-lg shadow-blue-500/20"
          >
            Contact Me
          </a>

          <a
            href="https://wa.me/923465979993"
            className="border border-gray-500 px-5 py-2 rounded-lg hover:bg-white hover:text-black transition"
          >
            WhatsApp
          </a>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">About Me</h2>

        <p className="text-gray-400 leading-relaxed">
          I am a passionate Full Stack Web Developer specializing in building
          complete web applications from frontend to backend. I focus on clean
          code, responsive design, and real-world project development using
          modern technologies.
        </p>
      </section>

      {/* SKILLS SECTION */}
      <section className="py-20 px-6 bg-[#0f172a]">
        <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-[#111827] border border-gray-800 rounded-2xl hover:scale-105 transition">
            <h3 className="font-semibold text-blue-400 mb-3">Frontend</h3>
            <p className="text-gray-400">
              HTML, CSS, JavaScript, React, Next.js, Tailwind CSS
            </p>
          </div>

          <div className="p-6 bg-[#111827] border border-gray-800 rounded-2xl hover:scale-105 transition">
            <h3 className="font-semibold text-green-400 mb-3">Backend</h3>
            <p className="text-gray-400">Node.js, Express.js, REST APIs</p>
          </div>

          <div className="p-6 bg-[#111827] border border-gray-800 rounded-2xl hover:scale-105 transition">
            <h3 className="font-semibold text-purple-400 mb-3">Database</h3>
            <p className="text-gray-400">MongoDB, Mongoose</p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-20 px-6 text-center bg-[#0b0f19]">
        <h2 className="text-3xl font-bold mb-6">Contact</h2>

        <div className="space-y-2 text-gray-400">
          <p>
            📧 Email:{" "}
            <a
              href="mailto:irfanmohmand987@gmail.com"
              className="text-blue-400"
            >
              irfanmohmand987@gmail.com
            </a>
          </p>

          <p>📱 Phone: 03465979993</p>
        </div>

        <div className="mt-8">
          <a
            href="https://wa.me/923465979993"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg shadow-green-500/20"
          >
            Hire Me on WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-sm text-gray-500 border-t border-gray-800">
        © {new Date().getFullYear()} Irfan Ullah. All rights reserved.
      </footer>
    </div>
  );
}
