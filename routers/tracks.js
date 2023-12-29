import express from "express";
import {
  createTrack,
  deleteTrack,
  getTrackById,
  getTracks,
  updateTrack,
} from "../controllers/index.js";
import { createTrackValidator } from "../middlewares/validators/tracks.js";
import { idValidator } from "../utils/handleValidator.js";

const route = express.Router();

route.get("/", getTracks);
route.get("/:id", idValidator, getTrackById);
route.post("/", createTrackValidator, createTrack);
route.put("/:id", idValidator, updateTrack);
route.delete("/:id", idValidator, deleteTrack);

export default route;
