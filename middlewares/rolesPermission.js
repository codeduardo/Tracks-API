import { UsersModel } from "../models/index.js";
import { ErrorMessage } from "../utils/handleError.js";

export const rolesPermission = (roles) => (req, res, next) => {
  try {
    const roleUser = req.user.role;
    const rolPermited = roleUser.some((rol) => roles.includes(rol));
    if (!rolPermited) return ErrorMessage(res, "ROL_NOT_PERMITED");
    next();
  } catch (error) {
    ErrorMessage(res, "ERROR_PERMISSIONS");
  }
};
