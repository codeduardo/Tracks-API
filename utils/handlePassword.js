const saltRounds = 10;

import bcrypt from "bcrypt";
export const hashPassword = async (text) => {
  const password = await bcrypt.hash(text, saltRounds);
  return password;
};
export const comparePassword = async (password, hashPassword) => {
  const isCorrect = await bcrypt.compare(password, hashPassword);
  return isCorrect;
};
