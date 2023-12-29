import { matchedData } from "express-validator";
import { TracksModel } from "../models/index.js";
import { ErrorMessage } from "../utils/handleError.js";

const getTracks = async (req, res) => {
  try {
    const tracks = await TracksModel.find({});
    return res.status(200).send(tracks);
  } catch (e) {
    ErrorMessage(res, "Error al listar canciones");
  }
};
const getTrackById = async (req, res) => {
  try {
    return res.json("asdsa");
  } catch (error) {
    ErrorMessage(res, "Error al solicitar cancion");
  }
};
const createTrack = async (req, res) => {
  try {
    const bodySanitized = matchedData(req);
    const data = await TracksModel.create(bodySanitized);
    return res.send(data);
  } catch (e) {
    ErrorMessage(res, "Error al crear cancion");
  }
};
const updateTrack = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const newTrack = await TracksModel.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!newTrack) return ErrorMessage(res, "Error al actualizar cancion");
    return res.send(newTrack);
  } catch (error) {
    ErrorMessage(res, "Error al actualizar cancion");
  }
};
const deleteTrack = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const deleteTrack = await TracksModel.deleteOne({ _id: id });
    if (deleteTrack.deletedCount === 0)
      return ErrorMessage(res, "El id proporcionado no existe");
    return res.send(deleteTrack);
  } catch (error) {
    ErrorMessage(res, "Error al eliminar cancion");
  }
};

export { getTracks, getTrackById, createTrack, updateTrack, deleteTrack };
