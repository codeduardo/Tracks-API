import request from "supertest";
import { app } from "../appInstance.js";
import mongoose from "mongoose";
import { TracksModel } from "../models/index.js";

describe("test on tracks api", () => {
  const body = {
    name: "Prueba",
    album: "Verano 2023",
    cover: "Verano 2024",
    artist: {
      name: "Juan Luis Guerra",
      nickname: "Juanca",
      nationality: "Cubano",
    },
    duration: { start: 0, end: 1 },
    mediaId: "4edd40c86762e0fb12000003",
  };
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGM3MmIwMDdiMTczNzQxMjc2Yzk2YiIsInJvbGUiOlsidXNlciJdLCJpYXQiOjE3MDM3MDMyMTYsImV4cCI6MTcwMzcyODQxNn0.Vecajmj9iPptmEChTnfFmbA-1xA9A67RFHpB4zCZ6Bc";

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

  describe("GET /api/tracks", () => {
    let response;
    beforeEach(async () => {
      response = await request(app)
        .get("/api/tracks")
        .set("Authorization", `Bearer ${token}`)
        .send();
    });

    it("should return status 200", () => {
      expect(response.status).toBe(200);
    });
    it("should contain json in header", () => {
      expect(response.headers["content-type"]).toContain("json");
    });
    it("should return an array", () => {
      expect(response.body).toBeInstanceOf(Array);
    });
  });
  describe("GET /api/tracks/:id", () => {
    let response;
    beforeAll(async () => {
      response = await request(app)
        .get("/api/tracks/6582610389ac53620a8f2db0")
        .set("Authorization", `Bearer ${token}`)
        .send();
    });
    it("should it works well", () => {
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });
    // it("should return the same id", () => {
    //   expect(response.body._id).toContain("6582610389ac53620a8f2db0");
    // });
  });
  describe("POST /api/tracks", () => {
    let response;

    beforeAll(async () => {
      response = await request(app)
        .post("/api/tracks")
        .set("Authorization", `Bearer ${token}`)
        .send(body);
    });
    afterAll(async () => {
      await TracksModel.deleteMany({ name: "Prueba" });
    });
    it("should return status 200", () => {
      expect(response.status).toBe(200);
    });
    it("should content json in header", () => {
      expect(response.headers["content-type"]).toContain("json");
    });
    it("should return the same name", () => {
      expect(response.body.name).toEqual(body.name);
    });
  });
  describe("PUT /api/tracks/:id", () => {
    let response;
    beforeAll(async () => {
      const model = await TracksModel.create(body);
      response = await request(app)
        .put(`/api/tracks/${model._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "prueba modificada" });
    });
    afterAll(async () => {
      await TracksModel.deleteMany({ name: "prueba modificada" });
    });
    it("should return status 200", async () => {
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });
    it("should return name changed", async () => {
      expect(response.body.name).toEqual("prueba modificada");
    });
  });
  describe("DELETE /api/tracks", () => {
    let response;
    let model;
    beforeAll(async () => {
      model = await TracksModel.create(body);
      response = await request(app)
        .delete(`/api/tracks/${model._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send();
    });
    it("should works well", () => {
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });

    it("should delete correctly", async () => {
      const findTrack = await TracksModel.findById(model._id);
      expect(findTrack).toBeNull();
    });
    it("should return itemCount 1", () => {
      expect(response.body.deletedCount).toBe(1);
    });
  });
});
