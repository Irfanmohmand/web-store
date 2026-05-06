import User from "@/models/UserModel";
import addCourse from "@/models/Courses";
import authOptions from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// GET user's favorites
export const GET = async (req) => {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized. Please login." },
        { status: 401 }
      );
    }

    const user = await User.findById(session.user.id).populate({
      path: "favorites",
      model: "AddCourse",
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Favorites fetched successfully",
        favorites: user.favorites || [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ GET FAVORITES ERROR:", error);
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
};

// POST - Add to favorites
export const POST = async (req) => {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized. Please login." },
        { status: 401 }
      );
    }

    const { courseId } = await req.json();

    if (!courseId) {
      return NextResponse.json(
        { message: "Course ID is required" },
        { status: 400 }
      );
    }

    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Initialize favorites array if it doesn't exist
    if (!user.favorites) {
      user.favorites = [];
    }

    // Check if already in favorites
    if (user.favorites.includes(courseId)) {
      return NextResponse.json(
        { message: "Course already in favorites" },
        { status: 400 }
      );
    }

    user.favorites.push(courseId);
    await user.save();

    return NextResponse.json(
      { message: "Added to favorites", favorites: user.favorites },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ ADD FAVORITE ERROR:", error);
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
};

// DELETE - Remove from favorites
export const DELETE = async (req) => {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized. Please login." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json(
        { message: "Course ID is required" },
        { status: 400 }
      );
    }

    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Initialize favorites array if it doesn't exist
    if (!user.favorites) {
      user.favorites = [];
    }

    user.favorites = user.favorites.filter(
      (id) => id.toString() !== courseId
    );
    await user.save();

    return NextResponse.json(
      { message: "Removed from favorites", favorites: user.favorites },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ REMOVE FAVORITE ERROR:", error);
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
};
