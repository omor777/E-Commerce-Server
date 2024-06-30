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
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
