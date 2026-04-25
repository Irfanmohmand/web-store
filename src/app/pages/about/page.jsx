import Image from "next/image";
import logo from "@/app/images/logo.png";

export default function About() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-gray-900 via-black to-red-900 flex justify-center items-center p-4">
      {/* MAIN BOX */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
        {/* LEFT SIDE */}
        <div className="w-full md:w-[60%] flex flex-col items-center justify-center p-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 relative">
            <Image src={logo} alt="logo" fill sizes="80px" />
          </div>

          <h1 className="text-white text-2xl sm:text-3xl font-black mt-4 text-center">
            About Our Web-Store
          </h1>

          <p className="text-gray-300 text-center mt-3 text-sm sm:text-base max-w-md">
            A modern learning platform to help you become a Full Stack Developer
            from zero to advanced level.
          </p>

          <p className="text-gray-400 text-center mt-4 text-sm sm:text-base max-w-md">
            This Web-Store is not just about learning — it’s about building your
            future in technology.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-[40%] flex flex-col justify-center items-center p-6">
          <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent mb-6">
            Why This Platform?
          </h2>

          <div className="w-full flex flex-col gap-4">
            <div className="bg-white/90 p-4 rounded-lg shadow">
              <h3 className="font-semibold text-red-500 mb-1">🎯 Purpose</h3>
              <p className="text-gray-600 text-sm">
                Learn web development step-by-step with real-world projects.
              </p>
            </div>

            <div className="bg-white/90 p-4 rounded-lg shadow">
              <h3 className="font-semibold text-red-500 mb-1">
                💡 Learning Style
              </h3>
              <p className="text-gray-600 text-sm">
                Practical learning with project-based approach.
              </p>
            </div>

            <div className="bg-white/90 p-4 rounded-lg shadow">
              <h3 className="font-semibold text-red-500 mb-1">🚀 Goal</h3>
              <p className="text-gray-600 text-sm">
                Become a professional developer and build real apps.
              </p>
            </div>
          </div>

          <h3 className="mt-6 text-lg font-bold text-white text-center">
            Learn. Build. Grow.
          </h3>
        </div>
      </div>
    </div>
  );
}
