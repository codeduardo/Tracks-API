import { app } from "./appInstance.js";

const PORT = process.env.PORT;

export const server = app.listen(PORT || 0, () => {
  const actualPort = server.address().port;
  console.log("Server running on port", actualPort);
});
