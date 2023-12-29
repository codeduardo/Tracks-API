import mongoose from "mongoose";

const TracksSchema = mongoose.Schema(
  {
    name: String,
    album: String,
    cover: {
      type: String,
      validate: {
        validator: () => {
          return true;
        },
        message: "ERROR NULL",
      },
    },
    artist: {
      name: String,
      nickname: String,
      nationality: String,
    },
    duration: {
      start: Number,
      end: Number,
    },
    mediaId: mongoose.Types.ObjectId,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const TracksModel = mongoose.model("tracks", TracksSchema);
