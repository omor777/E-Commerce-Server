import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    mobile: {
      type: String,
    },
    gender: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      min: [6, "password at least 6 character"],
      max: [15, "password should less than or equal to 15 character"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
    },
    profile: {
      type: String,
      default:
        "https://img.lovepik.com/png/20231031/User-avatar-placeholder-Placeholder-the-internet-Ring_430100_wh860.png",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
