import express from "express";
import { login, register } from "../controllers/auth.js";
import {
  loginValidator,
  registerValidator,
} from "../middlewares/validators/auth.js";
const route = express.Router();

route.post("/login", loginValidator, login);
route.post("/register", registerValidator, register);

export default route;
