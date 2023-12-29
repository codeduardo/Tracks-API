import { param, validationResult } from "express-validator";

export const handleValidator = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    res.status(403).send({ errors: err.array() });
  }
};

export const idValidator = [
  param("id").exists().notEmpty().isMongoId(),
  handleValidator,
];
