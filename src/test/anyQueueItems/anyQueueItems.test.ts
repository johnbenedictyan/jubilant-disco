import supertest from "supertest";

import app from "../../app";

const requestWithSupertest = supertest(app);

describe("Any Queue Item Endpoints", () => {
  it("GET /anyQueueItems should show all any queue items", async () => {
    const res = await requestWithSupertest.get("/api/anyQueueItems");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("anyQueueItems");
  });
});
