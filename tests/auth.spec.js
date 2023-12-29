import request from "supertest";
import mongoose from "mongoose";
import { app } from "../appInstance.js";
import { UsersModel } from "../models/index.js";
import { hashPassword } from "../utils/handlePassword.js";

describe("test on auth api", () => {
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
  describe("POST /api/login", () => {
    const user = {
      email: "test@gmail.com",
      password: "123456",
    };
    beforeAll(async () => {
      await UsersModel.create({
        email: "test@gmail.com",
        password: await hashPassword("123456"),
        name: "Test",
        age: 18,
      });
    });
    afterAll(async () => {
      await UsersModel.deleteOne({ email: user.email });
    });
    it("all works well", async () => {
      const response = await request(app).post("/api/auth/login").send(user);
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
      expect(response.body.token).toBeDefined();
    });
    it("should return error if password is incorrect", async () => {
      const incorrectPasswordResponse = await request(app)
        .post("/api/auth/login")
        .send({
          email: user.email,
          password: "incorrect_password",
        });
      expect(incorrectPasswordResponse.status).toBe(403);
    });
    it("should return error if user not exist in BD", async () => {
      const nonExistentUserResponse = await request(app)
        .post("/api/auth/login")
        .send({
          email: "nonexistent@gmail.com",
          password: "password",
        });
      expect(nonExistentUserResponse.status).toBe(403);
    });
  });
  describe("GET /api/register", () => {
    let response;
    let id;
    const user = {
      email: "test2@gmail.com",
      password: "123456",
      name: "Test",
      age: 18,
    };
    beforeAll(async () => {
      response = await request(app).post("/api/auth/register").send(user);
      id = response.body.user._id;
    });
    afterAll(async () => {
      await UsersModel.deleteOne({ _id: id });
    });
    it("all works well", () => {
      expect(response.status).toBe(201);
      expect(response.headers["content-type"]).toContain("json");
    });
    it("should return token", () => {
      expect(response.body.token).toBeDefined();
    });
  });
});
