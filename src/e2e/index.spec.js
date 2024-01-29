import { createApp } from "../createApp.mjs";
import mongoose from "mongoose";
import request from "supertest";

describe("/api/auth", () => {
  let app;
  beforeAll(() => {
    mongoose
      .connect("mongodb://localhost/express_tuts")
      .then(() => console.log("CONNECT to DATABASE....."))
      .catch((err) => console.log(err));

    app = createApp();
  });

  //   it("should create the user", async () => {
  //     const response = await request(app).post("/api/addUsers").send({
  //       username: "johnWick",
  //       password: "john123",
  //       displayName: "JohnWick",
  //     });
  //     expect(response.statusCode).toBe(201);
  //   });

  it("should log the user in and visit /api/auth/status and return authenticated user", async () => {
    const response = await request(app).post("/api/auth").send({
      username: "johnWick",
      password: "john123",
    }).then((res) => {
        return request(app)
          .get("/api/auth/status")
          .set("Cookie", res.headers["set-cookie"]);
      });
    expect(response.statusCode).toBe(200);
  });

  

  it("should return 401 when not logged in", async () => {
    const response = await request(app).get("/api/auth/status");
    expect(response.statusCode).toBe(401);
  });

  afterAll(async () => {
    // await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
