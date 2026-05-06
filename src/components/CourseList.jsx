"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FiHeart, FiSearch } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const CourseList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    getCourses();
    if (session) {
      getFavorites();
    }
  }, [session]);

  useEffect(() => {
    // Filter courses based on search query
    if (searchQuery.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.shortDes.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data]);

  const getCourses = async () => {
    try {
      const res = await axios.get("/api/getCourses");
      setData(res.data.courses);
      setFilteredData(res.data.courses);
    } catch (error) {
      console.log(error);
    }
  };

  const getFavorites = async () => {
    try {
      const res = await axios.get("/api/favorites");
      setFavorites(res.data.favorites.map((fav) => fav._id));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFavorite = async (e, courseId) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      toast.error("Please login to add favorites");
      return;
    }

    setLoading(true);
    try {
      if (favorites.includes(courseId)) {
        // Remove from favorites
        await axios.delete(`/api/favorites?courseId=${courseId}`);
        setFavorites(favorites.filter((id) => id !== courseId));
        toast.success("Removed from favorites");
      } else {
        // Add to favorites
        await axios.post("/api/favorites", { courseId });
        setFavorites([...favorites, courseId]);
        toast.success("Added to favorites");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-3 sm:px-6 lg:px-10 py-6 bg-gray-100">
      {/* ================= HEADER WITH SEARCH ================= */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-black text-gray-800">
          Courses
        </h1>

        {/* Search Bar */}
        <div className="relative w-full sm:w-96">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Results count */}
      {searchQuery && (
        <p className="text-gray-600 mb-4">
          Found {filteredData.length} course{filteredData.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredData?.map((courseData) => (
          <Link href={`/courses/${courseData._id}`} key={courseData._id}>
            {/* ================= CARD ================= */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden w-full relative">
              {/* Heart Icon */}
              {session && (
                <button
                  onClick={(e) => toggleFavorite(e, courseData._id)}
                  disabled={loading}
                  className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md hover:scale-110 transition"
                >
                  {favorites.includes(courseData._id) ? (
                    <FaHeart className="text-red-500 text-xl" />
                  ) : (
                    <FiHeart className="text-gray-600 text-xl" />
                  )}
                </button>
              )}

              {/* IMAGE */}
              <div className="relative w-full h-44 sm:h-48">
                {!courseData.file && (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <CgProfile className="text-4xl text-gray-400" />
                  </div>
                )}

                {courseData.file && (
                  <Image
                    src={courseData.file}
                    alt={courseData.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h2 className="text-base sm:text-lg font-bold line-clamp-2">
                  {courseData.title}
                </h2>

                <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                  {courseData.shortDes}
                </p>

                {/* PRICE + BUTTON */}
                <div className="flex items-center justify-between mt-5">
                  <h2 className="font-bold text-gray-800">
                    RS.{courseData.price || "4999"}
                  </h2>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/apply");
                    }}
                    className="text-sm border border-indigo-600 rounded-lg px-3 py-1 text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* No results message */}
      {filteredData.length === 0 && searchQuery && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No courses found for "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
};

export default CourseList;
