import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import apiRoutes from "./routers/index.js";
import { createConnection } from "./config/mongo.js";
import { IncomingWebhook } from "@slack/webhook";
import morganBody from "morgan-body";

dotenv.config();
const app = express();

const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK);
const loggerStream = {
  write: (message) => {
    webHook.send({
      text: message,
    });
  },
};

morganBody(app, {
  noColors: true,
  stream: loggerStream,
  skip: function (req, res) {
    return res.statusCode < 400;
  },
});
app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

app.use("/api", apiRoutes);
createConnection();

export { app };
