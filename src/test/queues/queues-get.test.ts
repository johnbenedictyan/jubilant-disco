import supertest from "supertest";

import app from "../../app";

const requestWithSupertest = supertest(app);

describe("Queue Endpoints", () => {
  it("GET /queue should show all queues", async () => {
    const res = await requestWithSupertest.get("/api/queues");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("queues");
  });
});
