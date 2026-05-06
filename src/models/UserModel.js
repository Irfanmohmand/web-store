import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    contact: {
      type: String,
      required: true,
    },
    file: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verifyToken: {
      type: String,
    },

    verifyTokenExpiry: {
      type: Date,
    },

    role: {
      type: String,
      default: "user",
    },

    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AddCourse",
      },
    ],
  },
  { timestamps: true },
);

// Clear the model cache to ensure schema updates are recognized
if (mongoose.models.User) {
  delete mongoose.models.User;
}

const User = mongoose.model("User", userSchema);
export default User;
