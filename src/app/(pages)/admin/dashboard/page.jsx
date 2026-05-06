"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import {
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiShield,
  FiBook,
  FiHeart,
  FiTrendingUp,
  FiActivity,
  FiSettings,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiDatabase,
} from "react-icons/fi";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
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
      fetchDashboardData();
    }
  }, [status, session, router]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, coursesRes] = await Promise.all([
        axios.get("/api/admin/stats"),
        axios.get("/api/getCourses"),
      ]);

      setStats(statsRes.data.stats);
      setCourses(coursesRes.data.courses);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const StatCard = ({ icon: Icon, title, value, change, color, bgColor, link }) => (
    <Link href={link || "#"}>
      <div className={`${bgColor} rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
            {change && (
              <p className="text-sm text-green-600 mt-2 flex items-center">
                <FiTrendingUp className="mr-1" />
                {change}
              </p>
            )}
          </div>
          <div className={`${color} bg-white rounded-full p-4`}>
            <Icon className="w-8 h-8" />
          </div>
        </div>
      </div>
    </Link>
  );

  const QuickAction = ({ icon: Icon, title, description, link, color }) => (
    <Link href={link}>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer border-l-4" style={{ borderColor: color }}>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}20` }}>
            <Icon className="w-6 h-6" style={{ color }} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );

  // Chart data
  const userChartData = {
    labels: ["Verified", "Unverified"],
    datasets: [
      {
        data: [stats?.verifiedUsers || 0, stats?.unverifiedUsers || 0],
        backgroundColor: ["#10b981", "#f59e0b"],
        borderWidth: 0,
      },
    ],
  };

  const roleChartData = {
    labels: ["Regular Users", "Admins"],
    datasets: [
      {
        data: [stats?.regularUsers || 0, stats?.adminUsers || 0],
        backgroundColor: ["#3b82f6", "#8b5cf6"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-blue-100">Welcome back, {session?.user?.name}!</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin/seed-courses"
                className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                <FiDatabase className="inline mr-2" />
                Seed Courses
              </Link>
              <Link
                href="/admin/migrate"
                className="px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition"
              >
                <FiSettings className="inline mr-2" />
                Migrate DB
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={FiUsers}
            title="Total Users"
            value={stats?.totalUsers || 0}
            change={`+${stats?.usersToday || 0} today`}
            color="text-blue-600"
            bgColor="bg-blue-50"
            link="/getUsers"
          />
          <StatCard
            icon={FiUserCheck}
            title="Verified Users"
            value={stats?.verifiedUsers || 0}
            change={`${stats?.verificationRate || 0}% verified`}
            color="text-green-600"
            bgColor="bg-green-50"
            link="/getUsers"
          />
          <StatCard
            icon={FiBook}
            title="Total Courses"
            value={courses.length}
            color="text-purple-600"
            bgColor="bg-purple-50"
            link="/courses"
          />
          <StatCard
            icon={FiShield}
            title="Admin Users"
            value={stats?.adminUsers || 0}
            color="text-orange-600"
            bgColor="bg-orange-50"
            link="/getUsers"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Verification Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              User Verification Status
            </h3>
            <div className="h-64 flex items-center justify-center">
              <Doughnut
                data={userChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom",
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* User Roles Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              User Roles Distribution
            </h3>
            <div className="h-64 flex items-center justify-center">
              <Doughnut
                data={roleChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <QuickAction
              icon={FiPlus}
              title="Add New Course"
              description="Create a new course for students"
              link="/addCourse"
              color="#3b82f6"
            />
            <QuickAction
              icon={FiUsers}
              title="Manage Users"
              description="View and manage all users"
              link="/getUsers"
              color="#10b981"
            />
            <QuickAction
              icon={FiEdit}
              title="Edit Course"
              description="Update existing course content"
              link="/editCourse"
              color="#f59e0b"
            />
            <QuickAction
              icon={FiTrash2}
              title="Delete Course"
              description="Remove courses from database"
              link="/deleteCourse"
              color="#ef4444"
            />
            <QuickAction
              icon={FiDatabase}
              title="Seed Courses"
              description="Add sample courses to database"
              link="/admin/seed-courses"
              color="#8b5cf6"
            />
            <QuickAction
              icon={FiSettings}
              title="Database Migration"
              description="Run database migrations"
              link="/admin/migrate"
              color="#6366f1"
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Users
              </h3>
              <Link
                href="/getUsers"
                className="text-blue-600 text-sm hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {stats?.latestUsers?.slice(0, 5).map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.isVerified
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {user.isVerified ? "Verified" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* System Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              System Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FiActivity className="text-blue-600 text-xl" />
                  <span className="text-gray-700">Recent Users (7 days)</span>
                </div>
                <span className="font-bold text-blue-600">
                  {stats?.recentUsers || 0}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FiUserCheck className="text-green-600 text-xl" />
                  <span className="text-gray-700">Verification Rate</span>
                </div>
                <span className="font-bold text-green-600">
                  {stats?.verificationRate || 0}%
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FiBook className="text-purple-600 text-xl" />
                  <span className="text-gray-700">Total Courses</span>
                </div>
                <span className="font-bold text-purple-600">
                  {courses.length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FiUserX className="text-orange-600 text-xl" />
                  <span className="text-gray-700">Unverified Users</span>
                </div>
                <span className="font-bold text-orange-600">
                  {stats?.unverifiedUsers || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
