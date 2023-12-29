import { matchedData } from "express-validator";
import { UsersModel } from "../models/index.js";
import { ErrorMessage } from "../utils/handleError.js";

import { comparePassword, hashPassword } from "../utils/handlePassword.js";
import { generateToken } from "../utils/handleToken.js";

export const register = async (req, res) => {
  try {
    const body = matchedData(req);
    const newPassword = await hashPassword(body.password);
    const { email, name, _id, role } = await UsersModel.create({
      ...body,
      password: newPassword,
    });
    const token = generateToken({ id: _id, role });
    res.status(201).send({ user: { _id, name, email }, token });
  } catch (error) {
    if (error.code === 11000) ErrorMessage(res, "DUPLICATE_USER");
    ErrorMessage(res, "ERROR_REGISTER");
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = matchedData(req);
    const user = await UsersModel.findOne({ email });
    if (user) {
      const isUser = await comparePassword(password, user.password);
      if (isUser) {
        const token = generateToken({ id: user._id, role: user.role });
        return res.send({
          user: {
            name: user.name,
            email: user.email,
          },
          token,
        });
      } else {
        return ErrorMessage(res, "CONTRASEÑA_INCORRECTA");
      }
    }
    return ErrorMessage(res, "USUARIO_NO_ENCONTRADO");
  } catch (error) {
    ErrorMessage(res, "ERROR_LOGIN");
  }
};
