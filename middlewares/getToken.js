import { ErrorMessage } from "../utils/handleError.js";
import { verifyToken } from "../utils/handleToken.js";

export const tokenMiddleware = (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return ErrorMessage(res, "NOT_TOKEN");
    const token = auth.split(" ").pop();
    const dataToken = verifyToken(token);
    if (!dataToken) return ErrorMessage(res, "NOT_ID_TOKEN");
    req.user = dataToken;
    next();
  } catch {
    return ErrorMessage(res, "INVALID_TOKEN");
  }
};
