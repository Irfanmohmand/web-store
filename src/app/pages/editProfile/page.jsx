import Link from "next/link";
import React from "react";

const construction = () => {
  return (
    <div className="w-full h-screen flex bg-black flex flex-col justify-center items-center ">
      <h1 className="text-gray-400 leading-10 font-black w-100 text-center text-2xl ">
        The Page Is Under Construction. Be Patience We will contact you ASAP.
        You Just fill the form to reserve your seat.
      </h1>
      <Link href={"/pages/apply"} className="mt-10 text-blue-500 underline ">
        Reserve Your Seat Now!
      </Link>
    </div>
  );
};

export default construction;
