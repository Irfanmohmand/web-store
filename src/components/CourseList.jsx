import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";

const CourseList = () => {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await axios.get("/api/getCourses");
        setData(res.data.courses);
      } catch (error) {
        console.log(error);
      }
    };

    getCourses();
  }, []);

  return (
    <div className="w-full px-3 sm:px-6 lg:px-10 py-6 bg-gray-100">
      {/* ================= HEADER ================= */}
      <h1 className="text-xl sm:text-2xl font-black mb-6 text-gray-800">
        Courses
      </h1>

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {data?.map((courseData) => (
          <Link href={`/courses/${courseData._id}`} key={courseData._id}>
            {/* ================= CARD ================= */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden w-full">
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
                  <h2 className="font-bold text-gray-800">RS.4999</h2>

                  <button
                    onClick={(e) => {
                      e.preventDefault(); // ✅ prevent Link navigation conflict
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
    </div>
  );
};

export default CourseList;
