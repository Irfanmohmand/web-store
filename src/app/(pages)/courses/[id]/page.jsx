"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CourseDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCourseDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/getCourses/${id}`);
        setData(res.data.courseDetail);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) getCourseDetails(); // ✅ prevent undefined call
  }, [id]);

  // ================= BULLET POINTS =================
  const raw = data?.bulletPoints?.[0] || "";

  const cleanData = raw
    .split("✔")
    .filter(Boolean)
    .map((item) => item.trim());

  // ✅ dynamic split instead of hardcoded 3
  const mid = Math.ceil(cleanData.length / 2);
  const left = cleanData.slice(0, mid);
  const right = cleanData.slice(mid);

  // ================= COURSE CONTENT =================
  const rawCourseCon = data?.courseCon?.[0] || "";

  const cleanCourseCon = rawCourseCon
    .split(/\d+\.\s*/)
    .filter(Boolean)
    .map((item) => item.trim());

  // ================= REQUIREMENTS =================
  const rawDataOfReq = data?.requirements?.[0] || "";

  const cleanDataOfReq = rawDataOfReq
    .split("✔")
    .filter(Boolean)
    .map((item) => item.trim());

  if (loading)
    return (
      <div className="w-full h-screen bg-white flex justify-center items-center font-black text-3xl">
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className="w-full bg-gray-100 min-h-screen px-4 md:px-10 py-6">
      {/* ✅ Responsive container padding */}

      <h1 className="text-center font-black text-2xl md:text-3xl text-gray-700 mb-6">
        Course Details
      </h1>

      {/* ================= BULLET POINTS ================= */}
      <div className="max-w-5xl mx-auto bg-white p-4 md:p-6 rounded-xl shadow-md">
        {/* ✅ centered + card style */}
        <h1 className="font-bold text-xl md:text-2xl mb-4">
          What You Will Learn
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* ✅ responsive grid */}

          <ul className="space-y-3">
            {left.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✔</span>
                <span className="text-sm md:text-base text-gray-700">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <ul className="space-y-3">
            {right.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✔</span>
                <span className="text-sm md:text-base text-gray-700">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ================= COURSE CONTENT ================= */}
      <div className="max-w-5xl mx-auto bg-white p-4 md:p-6 mt-6 rounded-xl shadow-md">
        <h1 className="font-bold text-xl md:text-2xl mb-4">Course Content</h1>

        <ul className="space-y-3">
          {cleanCourseCon.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">✔</span>
              <span className="text-sm md:text-base text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ================= REQUIREMENTS ================= */}
      <div className="max-w-5xl mx-auto bg-white p-4 md:p-6 mt-6 rounded-xl shadow-md">
        <h1 className="font-bold text-xl md:text-2xl mb-4">Requirements</h1>

        <ul className="space-y-4">
          {/* ✅ fixed spacing */}
          {cleanDataOfReq.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-green-600 mt-1">✔</span>
              <span className="text-sm md:text-base text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ================= DESCRIPTION ================= */}
      <div className="max-w-5xl mx-auto bg-white p-4 md:p-6 mt-6 rounded-xl shadow-md">
        <h1 className="font-bold text-xl md:text-2xl mb-4">Description</h1>

        <p className="text-sm md:text-base leading-7 md:leading-9 text-gray-600">
          {data?.fullDes}
        </p>
      </div>
    </div>
  );
};

export default CourseDetails;
