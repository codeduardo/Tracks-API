import { body } from "express-validator";
import { handleValidator } from "../../utils/handleValidator.js";

export const loginValidator = [
  body("email").exists().notEmpty(),
  body("password").exists().notEmpty(),
  handleValidator,
];
export const registerValidator = [
  body("email").exists().notEmpty(),
  body("name").exists().notEmpty(),
  body("age").exists().notEmpty().isNumeric(),
  body("password").exists().notEmpty(),
  handleValidator,
];
