import express from "express";
import { uploadMiddleware } from "../utils/handleUpload.js";
import {
  createStorage,
  deleteStorage,
  getStorageById,
  getStorages,
} from "../controllers/storage.js";
import { idValidator } from "../utils/handleValidator.js";

const route = express.Router();

route.get("/", getStorages);
route.get("/:id", idValidator, getStorageById);
route.post("/", uploadMiddleware.single("myfile"), createStorage);
route.delete("/:id", idValidator, deleteStorage);

export default route;
