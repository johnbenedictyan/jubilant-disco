import supertest from "supertest";

import app from "../../app";

const requestWithSupertest = supertest(app);

describe("Users Endpoints", () => {
  it("GET /users should show all users", async () => {
    const res = await requestWithSupertest.get("/api/users");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("users");
  });
});
