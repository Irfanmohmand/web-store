import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    file: {
      type: String,
    },

    courseName: {
      type: String,
      required: true,
    },

    courseDetails: {
      type: String,
      required: true,
    },

    coursePrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Courses =
  mongoose.models.Courses || mongoose.model("Courses", CourseSchema);
export default Courses;
