"use client";
import axios from "axios";
import Image from "next/image";
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
    <div className="w-full bg-gray-200 h-screen mt-10 ">
      <h1 className="font-black text-2xl">What to learn next</h1>
      <h4 className="font-bold text-lg mt-2">Recommended for you</h4>
      <p className="text-xl font-black mt-4"> {data.message} </p>
      <div className="flex gap-2">
        {data?.courses?.map((courseData) => (
          <div key={courseData._id}>
            <div className="imgBox w-50 h-50 overflow-hidden relative ">
              <Image
                src={courseData.file}
                alt={`${courseData.courseName}`}
                className="object-cover "
                width={240}
                height={240}
              />
            </div>
            <h1 className="text-2xl font-black"> {courseData.courseName} </h1>
            <p className="text-lg text-gray-500">
              {" "}
              {courseData.courseDetails}{" "}
            </p>
            <h2 className="font-bold text-gray-700">
              Rs. {courseData.coursePrice}{" "}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
