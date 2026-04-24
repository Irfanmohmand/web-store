import Admissions from "@/app/models/Admission";
import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await dbConnect();

    const { name, whatsapp, course, level, availability, goal } =
      await req.json();

    if (!name || !whatsapp || !course || !level || !availability) {
      return NextResponse.json(
        {
          message: "Please fill all fields.",
        },
        { status: 400 },
      );
    }

    const admission = await Admissions.create({
      name,
      whatsapp,
      course,
      availability,
      level,
      goal,
    });

    return NextResponse.json(
      {
        message: "Your form successfully submitted.",
        admission,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({
      message: `Error from 500 backend api. ${error} `,
    });
  }
};
