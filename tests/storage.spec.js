import request from "supertest";
import mongoose from "mongoose";

import { app } from "../appInstance.js";
import { StorageModel } from "../models/index.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("test on storage api", () => {
  beforeAll(async () => {
    const randomPort = app.get("port") || 0;
    await app.listen(randomPort);
    await mongoose.connect(
      "mongodb+srv://agredu1234:Yoppues12.@clustermongonode.fiovxuh.mongodb.net/mongo_00?retryWrites=true&w=majority"
    );
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("GET /api/storage", () => {
    let response;
    beforeAll(async () => {
      response = await request(app).get("/api/storage").send();
    });
    it("all works well", () => {
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });
    it("should return an array", () => {
      expect(response.body).toBeInstanceOf(Array);
    });
  });
  describe("GET /api/storage/:id", () => {
    let response;
    let newItem;
    let id;
    beforeAll(async () => {
      newItem = await StorageModel.create({
        url: "http://localhost:8080/file-1703469363075.docx",
        filename: "file-1703469363075.docx",
      });
      id = newItem._id.toString();
      response = await request(app).get(`/api/storage/${id}`).send();
    });
    afterAll(async () => {
      await StorageModel.deleteOne({ _id: newItem._id });
    });
    it("all works well", () => {
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });
    it("should return the same id", () => {
      expect(response.body._id.toString()).toEqual(newItem._id.toString());
    });
  });
  describe("POST /api/storage", () => {
    let response;
    let id;
    beforeAll(async () => {
      response = await request(app)
        .post("/api/storage")
        .set("Content-Type", "multipart/form-data")
        .attach("myfile", `${__dirname}/../storage/CREDENTIAL.txt`);
      id = response.body._id.toString();
    });
    afterAll(async () => {
      await request(app).delete(`/api/storage/${id}`).send();
    });
    it("all works well", () => {
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });
  });
  describe("DELETE /api7storage", () => {
    let response;
    let id;
    beforeAll(async () => {
      response = await request(app)
        .post("/api/storage")
        .set("Content-Type", "multipart/form-data")
        .attach("myfile", `${__dirname}/../storage/CREDENTIAL.txt`);
      id = response.body._id.toString();
      await request(app).delete(`/api/storage/${id}`).send();
    });

    it("all works well", async () => {
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });
    it("should not exist in bd", async () => {
      // await request(app).delete(`/api/storage/${id}`).send();
      const item = await StorageModel.findById(id);
      expect(item).toBeNull();
    });
  });
});
