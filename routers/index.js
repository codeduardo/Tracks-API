import express from "express";
import { readdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import tracksRoute from "./tracks.js";
import storageRoute from "./storage.js";
import authRoute from "./auth.js";
import { tokenMiddleware } from "../middlewares/getToken.js";
import { rolesPermission } from "../middlewares/rolesPermission.js";

const router = express.Router();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// (async () => {
//   try {
//     const files = await readdir(__dirname);

//     files.map(async (route) => {
//       console.log(route);
//       const onlyRoute = route.split(".").shift();
//       if (onlyRoute !== "index") {
//         const { default: routeModule } = await import(`./${route}`);
//         router.use(`/${onlyRoute}`, routeModule);
//       }
//     });
//   } catch (error) {
//     console.error("Error reading directory:", error);
//   }
// })();
router.use(
  "/tracks",
  [tokenMiddleware, rolesPermission(["admin"])],
  tracksRoute
);
router.use("/storage", storageRoute);
router.use("/auth", authRoute);

export default router;
