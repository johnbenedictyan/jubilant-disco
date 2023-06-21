import supertest from "supertest";

import app from "../../app";

const requestWithSupertest = supertest(app);

describe("Tag Endpoints", () => {
  it("GET /tags should show all tags", async () => {
    const res = await requestWithSupertest.get("/api/tags");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("tags");
  });
});
