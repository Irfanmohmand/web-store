"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const addCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [courseDetails, setCourseDetails] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImage = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setFile(files[0]);
  };

  const handleCourse = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("courseName", courseName);
      formData.append("courseDetails", courseDetails);
      formData.append("coursePrice", coursePrice);
      if (file) formData.append("file", file);
      //   console.log(courseName, courseDetails, coursePrice, file);

      const result = await axios.post("/api/postCourses", formData);
      toast.success(result.data.message);
      setCourseName("");
      setCourseDetails("");
      setCoursePrice("");
      router.push("/pages/home");
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-500 flex justify-center items-center ">
      <div className="w-100 bg-gray-700 h-120 rounded-lg ">
        <h1 className="text-white font-black mt-2 text-center">Add Course</h1>
        <form
          onSubmit={handleCourse}
          className="flex flex-col gap-6 mt-10 justify-center items-center"
          action=""
        >
          <input
            onChange={(e) => setCourseName(e.target.value)}
            type="text"
            id="courseName"
            name="courseName"
            className="px-6 py-2 bg-gray-100 w-[90%] rounded-lg"
            placeholder="courseName"
          />
          <input
            onChange={(e) => setCourseDetails(e.target.value)}
            type="text"
            id="courseDetails"
            name="courseDetails"
            className="px-6 py-2 bg-gray-100 w-[90%] rounded-lg"
            placeholder="courseDetails"
          />
          <input
            onChange={(e) => setCoursePrice(e.target.value)}
            type="number"
            id="coursePrice"
            name="coursePrice"
            className="px-6 py-2 bg-gray-100 w-[90%] rounded-lg"
            placeholder="coursePrice"
          />
          <input
            type="file"
            id="courseFile"
            name="courseFile"
            className="px-6 py-2 bg-gray-100 w-[90%] rounded-lg"
            onChange={handleImage}
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 rounded-lg cursor-pointer text-white"
          >
            {loading ? "Loading..." : "Add Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default addCourse;
