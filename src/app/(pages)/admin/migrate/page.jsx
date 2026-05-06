"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function MigratePage() {
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

  const runMigration = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/admin/migrate-favorites");
      setResult(response.data);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Migration failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Database Migration
          </h1>
          <p className="text-gray-600 mb-6">
            This will add the <code className="bg-gray-100 px-2 py-1 rounded">favorites</code> field to all existing users who don't have it yet.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Warning:</strong> This is a one-time operation. It's safe to run multiple times.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={runMigration}
            disabled={loading}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
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
                Running Migration...
              </span>
            ) : (
              "Run Migration"
            )}
          </button>

          {result && (
            <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4">
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
                    Migration Completed Successfully!
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Users matched: {result.matchedCount}</p>
                    <p>Users updated: {result.modifiedCount}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              What this does:
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Finds all users without a <code>favorites</code> field</li>
              <li>Adds an empty <code>favorites</code> array to those users</li>
              <li>Enables the favorites feature for all users</li>
              <li>Safe to run multiple times (won't duplicate data)</li>
            </ul>
          </div>

          <div className="mt-6">
            <button
              onClick={() => router.push("/getUsers")}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Users
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
