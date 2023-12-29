import { matchedData } from "express-validator";
import { StorageModel } from "../models/index.js";
import { ErrorMessage } from "../utils/handleError.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathName = `${__dirname}/../storage`;

const getStorages = async (req, res) => {
  const storages = await StorageModel.find({});
  return res.send(storages);
};
const getStorageById = async (req, res) => {
  const data = matchedData(req);
  try {
    const item = await StorageModel.findById(data.id);
    res.send(item);
  } catch {
    ErrorMessage(res, "ERROR_OBTAIN_BY_ID");
  }
};
const createStorage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return ErrorMessage(res, "No existe un archivo ");
    const newFile = {
      url: `${process.env.PUBLIC_URL}/${file.filename}`,
      filename: file.filename,
    };
    const storage = await StorageModel.create(newFile);
    return res.send(storage);
  } catch (err) {
    ErrorMessage(res, "error al crear archivo");
  }
};
const deleteStorage = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const item = await StorageModel.findById(id);
    if (!item) return ErrorMessage(res, "El archivo no existe");
    const deletedItem = await StorageModel.deleteOne({ _id: id });
    fs.unlinkSync(`${pathName}/${item.filename}`);
    return res.send(deletedItem);
  } catch (error) {
    ErrorMessage(res, "Error al eliminar archivo");
  }
};

export { getStorages, getStorageById, createStorage, deleteStorage };
