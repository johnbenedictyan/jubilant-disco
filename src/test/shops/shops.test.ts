import supertest from "supertest";

import app from "../../app";

const requestWithSupertest = supertest(app);

describe("Shop Endpoints", () => {
  beforeAll(async () => {});
  it("GET /shop should show all shops", async () => {
    const res = await requestWithSupertest.get("/api/shops");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("shops");
  });
  it("POST /shop should show all shops", async () => {
    const res = await requestWithSupertest.get("/api/shops");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("shops");
  });
  afterAll(async () => {});
});
