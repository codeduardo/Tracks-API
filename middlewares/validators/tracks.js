import { body, param } from "express-validator";
import { handleValidator } from "../../utils/handleValidator.js";

export const createTrackValidator = [
  body("name").exists().notEmpty(),
  body("album").exists().notEmpty(),
  body("cover").exists().notEmpty(),
  body("artist").exists().notEmpty(),
  body("artist.name").exists().notEmpty(),
  body("artist.nickname").exists().notEmpty(),
  body("artist.nationality").exists().notEmpty(),
  body("duration.start").exists().notEmpty(),
  body("duration.end").exists().notEmpty(),
  body("mediaId").exists().notEmpty().isMongoId(),
  handleValidator,
];
