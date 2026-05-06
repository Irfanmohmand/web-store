"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import {
  FiUsers,
  FiBook,
  FiCalendar,
  FiPhone,
  FiTarget,
  FiFilter,
  FiDownload,
  FiSearch,
} from "react-icons/fi";

export default function ApplicationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
      return;
    }

    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/home");
      return;
    }

    if (status === "authenticated") {
      fetchApplications();
      fetchCourses();
    }
  }, [status, session, router]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/admin/applications");
      setApplications(response.data.applications);
      setStats(response.data.stats);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get("/api/getCourses");
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.whatsapp.toString().includes(searchTerm);

    const matchesCourse = filterCourse ? app.course === filterCourse : true;
    const matchesLevel = filterLevel ? app.level === filterLevel : true;

    return matchesSearch && matchesCourse && matchesLevel;
  });

  const exportToCSV = () => {
    const headers = [
      "Name",
      "WhatsApp",
      "Course",
      "Level",
      "Availability",
      "Goal",
      "Applied Date",
    ];
    const csvData = filteredApplications.map((app) => [
      app.name,
      app.whatsapp,
      app.course,
      app.level,
      app.availability,
      app.goal || "N/A",
      new Date(app.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `applications_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Course Applications</h1>
              <p className="text-blue-100">
                View and manage all course applications
              </p>
            </div>
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Total Applications
                </p>
                <h3 className="text-3xl font-bold text-gray-800">
                  {stats?.total || 0}
                </h3>
              </div>
              <div className="bg-blue-100 text-blue-600 rounded-full p-4">
                <FiUsers className="w-8 h-8" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Courses Applied
                </p>
                <h3 className="text-3xl font-bold text-gray-800">
                  {stats?.byCourse?.length || 0}
                </h3>
              </div>
              <div className="bg-purple-100 text-purple-600 rounded-full p-4">
                <FiBook className="w-8 h-8" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  This Week
                </p>
                <h3 className="text-3xl font-bold text-gray-800">
                  {
                    applications.filter(
                      (app) =>
                        new Date(app.createdAt) >
                        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                    ).length
                  }
                </h3>
              </div>
              <div className="bg-green-100 text-green-600 rounded-full p-4">
                <FiCalendar className="w-8 h-8" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">
                  Today
                </p>
                <h3 className="text-3xl font-bold text-gray-800">
                  {
                    applications.filter(
                      (app) =>
                        new Date(app.createdAt).toDateString() ===
                        new Date().toDateString()
                    ).length
                  }
                </h3>
              </div>
              <div className="bg-orange-100 text-orange-600 rounded-full p-4">
                <FiTarget className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, course, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Course Filter */}
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Courses</option>
              {stats?.byCourse?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item._id} ({item.count})
                </option>
              ))}
            </select>

            {/* Level Filter */}
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            {/* Export Button */}
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2"
            >
              <FiDownload />
              Export CSV
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredApplications.length} of {applications.length}{" "}
            applications
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    WhatsApp
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Availability
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Goal
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Applied Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApplications.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No applications found
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((app) => (
                    <tr
                      key={app._id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                            {app.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {app.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={`https://wa.me/${app.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
                        >
                          <FiPhone className="w-4 h-4" />
                          {app.whatsapp}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          {app.course}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            app.level === "beginner"
                              ? "bg-green-100 text-green-800"
                              : app.level === "intermediate"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {app.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {app.availability}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                        {app.goal || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Courses */}
        {stats?.byCourse && stats.byCourse.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Most Popular Courses
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.byCourse.slice(0, 6).map((item, index) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {item._id}
                      </p>
                      <p className="text-sm text-gray-600">
                        {item.count} applications
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
