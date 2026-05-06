"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { 
  FiUsers, 
  FiUserCheck, 
  FiUserX, 
  FiShield,
  FiChevronLeft,
  FiChevronRight,
  FiTrash2
} from "react-icons/fi";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, limit]);

  useEffect(() => {
    // Fetch search suggestions as user types
    if (search.length > 0) {
      fetchSearchSuggestions();
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [search]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        `/api/getUsers?page=${currentPage}&limit=${limit}&search=${search}`
      );
      
      setUsers(result.data.users);
      setStats(result.data.stats);
      setPagination(result.data.pagination);
      
      if (currentPage === 1) {
        toast.success(result.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchSuggestions = async () => {
    try {
      const result = await axios.get(
        `/api/getUsers?page=1&limit=5&search=${search}`
      );
      setSearchSuggestions(result.data.users);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Failed to fetch suggestions");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setShowSuggestions(false);
    fetchUsers();
  };

  const handleSuggestionClick = (userName) => {
    setSearch(userName);
    setShowSuggestions(false);
    setCurrentPage(1);
    setTimeout(() => fetchUsers(), 100);
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
      return;
    }

    setDeleting(userId);
    try {
      const result = await axios.delete(`/api/admin/deleteUser?userId=${userId}`);
      toast.success(result.data.message);
      
      // Refresh the user list
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    } finally {
      setDeleting(null);
    }
  };

  const StatBox = ({ icon: Icon, title, value, color, bgColor }) => (
    <div className={`${bgColor} rounded-lg shadow-lg p-6 flex items-center gap-4`}>
      <div className={`${color} bg-white rounded-full p-4`}>
        <Icon className="w-8 h-8" />
      </div>
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-8">
          Admin Dashboard
        </h1>

        {/* Statistics Boxes */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatBox
              icon={FiUsers}
              title="Total Users"
              value={stats.totalUsers}
              color="text-blue-600"
              bgColor="bg-blue-50"
            />
            <StatBox
              icon={FiUserCheck}
              title="Verified Users"
              value={stats.verifiedUsers}
              color="text-green-600"
              bgColor="bg-green-50"
            />
            <StatBox
              icon={FiUserX}
              title="Unverified Users"
              value={stats.unverifiedUsers}
              color="text-orange-600"
              bgColor="bg-orange-50"
            />
            <StatBox
              icon={FiShield}
              title="Admin Users"
              value={stats.adminUsers}
              color="text-purple-600"
              bgColor="bg-purple-50"
            />
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => search.length > 0 && setShowSuggestions(true)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              {/* Search Suggestions Dropdown */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {searchSuggestions.map((user) => (
                    <button
                      key={user._id}
                      type="button"
                      onClick={() => handleSuggestionClick(user.name)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-3 border-b last:border-b-0"
                    >
                      <div className="w-10 h-10 relative rounded-full overflow-hidden flex-shrink-0">
                        {user.file ? (
                          <Image
                            src={user.file}
                            fill
                            alt={user.name}
                            sizes="40px"
                            className="object-cover"
                          />
                        ) : (
                          <CgProfile className="w-full h-full text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Search
            </button>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </form>
        </div>

        {/* Users Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading users...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {users?.map((user) => (
                <div
                  key={user._id}
                  className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition relative"
                >
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteUser(user._id, user.name)}
                    disabled={deleting === user._id}
                    className="absolute top-3 right-3 p-2 bg-red-50 rounded-full hover:bg-red-100 transition"
                    title="Delete user"
                  >
                    {deleting === user._id ? (
                      <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <FiTrash2 className="text-red-500 text-lg" />
                    )}
                  </button>

                  {/* User Image */}
                  <div className="w-20 h-20 relative rounded-full overflow-hidden mb-4 border-4 border-gray-200">
                    {user.file ? (
                      <Image
                        src={user.file}
                        fill
                        alt={user.name}
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : (
                      <CgProfile className="w-full h-full text-gray-400" />
                    )}
                  </div>

                  {/* User Info */}
                  <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
                    {user.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-1">{user.email}</p>
                  <p className="text-gray-600 text-sm mb-3">{user.contact}</p>

                  {/* Badges */}
                  <div className="flex gap-2 flex-wrap justify-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.isVerified
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {user.isVerified ? "Verified" : "Unverified"}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination && (
              <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-gray-600">
                  Showing {users.length} of {pagination.totalUsers} users
                </p>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={!pagination.hasPrevPage}
                    className={`p-2 rounded-lg ${
                      pagination.hasPrevPage
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <FiChevronLeft className="w-5 h-5" />
                  </button>

                  <span className="px-4 py-2 bg-gray-100 rounded-lg font-semibold">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={!pagination.hasNextPage}
                    className={`p-2 rounded-lg ${
                      pagination.hasNextPage
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Users;
