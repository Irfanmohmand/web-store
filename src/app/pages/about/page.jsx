export default function About() {
  return (
    <div className="bg-gray-50 py-16 px-6">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800">
          About Our Web-Store
        </h1>
        <p className="mt-4 text-gray-600">
          A modern learning platform to help you become a Full Stack Developer
          from zero to advanced level.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-blue-600 mb-3">
            🎯 Purpose
          </h2>
          <p className="text-gray-600">
            To help beginners learn web development step-by-step with real-world
            projects and practical skills.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-green-600 mb-3">
            💡 Learning Style
          </h2>
          <p className="text-gray-600">
            We focus on practical learning, project building, and industry-ready
            skills instead of just theory.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-purple-600 mb-3">
            🚀 Goal
          </h2>
          <p className="text-gray-600">
            To turn beginners into professional developers who can build real
            applications and earn online.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800">
          Learn. Build. Grow.
        </h2>
        <p className="mt-3 text-gray-600">
          This Web-Store is not just about learning — it’s about building your
          future in technology.
        </p>
      </div>
    </div>
  );
}
