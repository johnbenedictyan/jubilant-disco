import supertest from "supertest";

import app from "../../app";

const requestWithSupertest = supertest(app);

describe("Queue Item Endpoints", () => {
  beforeAll(async () => {});
  it("GET /queueItems should show all queue items", async () => {
    const res = await requestWithSupertest.get("/api/queueItems");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("queueItems");
  });
  afterAll(async () => {});
});
