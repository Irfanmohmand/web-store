"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SeedCoursesPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (status === "unauthenticated" || session?.user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-4">Admin access required</p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const seedCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/admin/seed-courses");
      setResult(response.data);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Seeding failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const coursesToAdd = [
    { name: "HTML, CSS, JavaScript & Tailwind CSS", price: "Rs.6,999" },
    { name: "MongoDB - Complete Database Mastery", price: "Rs.3,999" },
    { name: "Next.js - Modern React Framework", price: "Rs.7,999" },
    { name: "Node.js & Express.js - Backend Development", price: "Rs.8,999" },
    { name: "Full Stack Web Development - MERN Stack", price: "Rs.14,999" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Seed Courses to Database
          </h1>
          <p className="text-gray-600 mb-6">
            This will add the following courses to your database:
          </p>

          {/* Courses List */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Courses to be added:
            </h2>
            <div className="space-y-3">
              {coursesToAdd.map((course, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200"
                >
                  <div>
                    <p className="font-medium text-gray-800">{course.name}</p>
                  </div>
                  <span className="text-green-600 font-bold">
                    {course.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> Courses that already exist will be
                  skipped. This is safe to run multiple times.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={seedCourses}
            disabled={loading}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Adding Courses...
              </span>
            ) : (
              "Add Courses to Database"
            )}
          </button>

          {result && (
            <div className="mt-6 space-y-4">
              {/* Success Summary */}
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Seeding Completed!
                    </h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>✅ Added: {result.addedCount} courses</p>
                      <p>⏭️ Skipped: {result.skippedCount} courses (already exist)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Added Courses */}
              {result.addedCourses && result.addedCourses.length > 0 && (
                <div className="bg-white border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">
                    ✅ Added Courses:
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {result.addedCourses.map((course, index) => (
                      <li key={index}>{course}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skipped Courses */}
              {result.skippedCourses && result.skippedCourses.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    ⏭️ Skipped Courses (already exist):
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {result.skippedCourses.map((course, index) => (
                      <li key={index}>{course}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => router.push("/home")}
              className="flex-1 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              View Courses
            </button>
            <button
              onClick={() => router.push("/addCourse")}
              className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add Custom Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
