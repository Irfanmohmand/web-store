"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("Please login to view favorites");
      router.push("/");
      return;
    }

    if (status === "authenticated") {
      getFavorites();
    }
  }, [status, router]);

  const getFavorites = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/favorites");
      setFavorites(res.data.favorites);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch favorites");
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (e, courseId) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await axios.delete(`/api/favorites?courseId=${courseId}`);
      setFavorites(favorites.filter((course) => course._id !== courseId));
      toast.success("Removed from favorites");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 px-3 sm:px-6 lg:px-10 py-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-800 mb-2">
          My Favorites
        </h1>
        <p className="text-gray-600 mb-6">
          {favorites.length} course{favorites.length !== 1 ? "s" : ""} saved
        </p>

        {/* Empty State */}
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <FaHeart className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-700 mb-2">
              No favorites yet
            </h2>
            <p className="text-gray-500 mb-6">
              Start adding courses to your favorites by clicking the heart icon
            </p>
            <Link
              href="/home"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          /* Favorites Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {favorites.map((courseData) => (
              <Link href={`/courses/${courseData._id}`} key={courseData._id}>
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden w-full relative">
                  {/* Remove Heart Icon */}
                  <button
                    onClick={(e) => removeFavorite(e, courseData._id)}
                    className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md hover:scale-110 transition"
                  >
                    <FaHeart className="text-red-500 text-xl" />
                  </button>

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
                          router.push("/");
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
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
