import jwt from "jsonwebtoken";
export const generateToken = (data) => {
  return jwt.sign(data, process.env.SECRET_KEY, {
    expiresIn: "7h",
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};
