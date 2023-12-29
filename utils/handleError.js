export const ErrorMessage = (res, msg, status = 403) => {
  res.status(status);
  return res.send({ error: msg });
};
