"use client";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const dynamicData = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!id) return;

    const getCourseDetails = async () => {
      try {
        const result = await axios.get(`/api/getCourses/${id}`);
        setData(result.data);
        console.log(result.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    getCourseDetails();
  }, [id]);

  // get data from api

  return (
    <div>
      <h2>Dynamic {data?.message}</h2>
      <h1> {data?.courseDetail?.courseName} </h1>
      <p> {data?.courseDetail?.courseDetails} </p>
      {data?.courseDetail?.file ? (
        <div className="w-20 h-20 relative">
          <Image
            src={data?.courseDetail?.file}
            alt="courseImg"
            className="object-cover"
            loading="eager"
            sizes="80"
            fill
          />
        </div>
      ) : (
        <div>
          <h1>No Image</h1>
        </div>
      )}
    </div>
  );
};

export default dynamicData;
