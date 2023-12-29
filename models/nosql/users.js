import mongoose from "mongoose";

const UsersSchema = mongoose.Schema(
  {
    name: String,
    age: Number,
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: true,
    },
    role: {
      type: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UsersModel = mongoose.model("usuarios", UsersSchema);
