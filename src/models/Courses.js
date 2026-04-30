import mongoose from "mongoose";

const addCourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    shortDes: {
      type: String,
      required: true,
    },

    fullDes: {
      type: String,
      required: true,
    },

    requirements: [
      {
        type: String,
        required: true,
      },
    ],
    courseCon: [
      {
        type: String,
        required: true,
      },
    ],
    price: {
      type: String,
      required: true,
    },
    bulletPoints: [
      {
        type: String,
        required: true,
      },
    ],
    file: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const addCourse =
  mongoose.models.AddCourse || mongoose.model("AddCourse", addCourseSchema);

export default addCourse;
