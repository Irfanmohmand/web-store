"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CourseList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const result = await axios.get("/api/getCourses");
        setData(result.data);
        // console.log(result.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getCourses();
  }, []);

  return (
    <div className="w-full mt-15 bg-gradient-to-r from-black to-red-950 ">
      <h1 className="font-black text-2xl">What to learn next</h1>
      <h4 className="font-bold text-lg mt-10 text-gray-700 ">
        Recommended for you
      </h4>
      {/* <p className="text-xl font-black mt-4"> {data.message} </p> */}
      <div className="flex flex-wrap justify-center mt-4 gap-10 items-center ">
        {data?.courses?.map((courseData) => (
          <div
            key={courseData._id}
            className="flex flex-col gap-2 shadow-lg rounded-lg"
          >
            {courseData.file ? (
              <div className="imgBox w-70 h-50 overflow-hidden relative ">
                <Image
                  src={courseData.file}
                  alt={`${courseData?.courseName}`}
                  className="object-cover rounded-lg "
                  fill
                  loading="eager"
                />
              </div>
            ) : (
              <div className="w-50 h-50 bg-red-500 rounded-lg">
                <p> No Image</p>
              </div>
            )}
            <div className="mx-2 p-4">
              <h1 className="text-2xl font-black text-white">
                {" "}
                {courseData.courseName}{" "}
              </h1>
              <p className="text-lg text-gray-200">
                {" "}
                {courseData.courseDetails}{" "}
              </p>
              <h2 className="font-bold text-gray-400">
                Rs. {courseData.coursePrice}{" "}
              </h2>
              <div className="mt-4 underline text-white">
                <Link href={`/pages/courses/${courseData?._id}`}>More</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
