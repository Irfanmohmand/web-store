import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    whatsapp: {
      type: Number,
      required: true,
    },

    course: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      required: true,
    },

    availability: {
      type: String,
      required: true,
    },

    goal: {
      type: String,
    },
  },
  { timestamps: true },
);

const Admissions =
  mongoose.models.Admissions || mongoose.model("Admissions", admissionSchema);

export default Admissions;
