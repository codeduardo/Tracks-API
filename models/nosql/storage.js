import mongoose from "mongoose";

const StorageSchema = mongoose.Schema(
  {
    url: String,
    filename: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const StorageModel = mongoose.model("storage", StorageSchema);
