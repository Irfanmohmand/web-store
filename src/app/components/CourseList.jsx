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
        console.log(result.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getCourses();
  }, []);

  return (
    <div className="w-full h-screen mt-10 ">
      <h1 className="font-black text-2xl">What to learn next</h1>
      <h4 className="font-bold text-lg mt-10 text-gray-700 ">
        Recommended for you
      </h4>
      {/* <p className="text-xl font-black mt-4"> {data.message} </p> */}
      <div className="flex flex-wrap justify-center mt-4 gap-10 items-center ">
        {data?.courses?.map((courseData) => (
          <div key={courseData._id} className="flex flex-col gap-2">
            {courseData.file ? (
              <div className="imgBox w-50 h-50 overflow-hidden relative ">
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
            <h1 className="text-2xl font-black"> {courseData.courseName} </h1>
            <p className="text-lg text-gray-500">
              {" "}
              {courseData.courseDetails}{" "}
            </p>
            <h2 className="font-bold text-gray-700">
              Rs. {courseData.coursePrice}{" "}
            </h2>
            <Link href={`/pages/courses/${courseData?._id}`}>More</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
