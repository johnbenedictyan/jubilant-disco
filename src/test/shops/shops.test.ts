import supertest from "supertest";

import app from "../../app";
import {
    createTestUser,
    deleteTestUser,
    TEST_USER,
} from "../users/userTestHelper";
import { createTestShop, deleteTestShop, TEST_SHOP } from "./shopTestHelper";

const requestWithSupertest = supertest(app);

describe("Authenticated Shop Endpoints", () => {
  let authToken = "";
  beforeAll(async () => {
    // Create Test User
    await createTestUser();

    // Login using test user
    const payload = {
      user: {
        email: TEST_USER.email,
        password: TEST_USER.password,
      },
    };
    const res = await requestWithSupertest
      .post("/api/users/login")
      .set("Content-Type", "application/json")
      .send(payload);
    expect(res.status).toEqual(200);

    authToken = res.body.user.token;
  });

  it("GET /shop should show all shops", async () => {
    const res = await requestWithSupertest
      .get("/api/shops")
      .set("Content-Type", "application/json")
      .set("Authorization", `Token ${authToken}`);

    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("shops");
  });

  it("POST /shop should create test shop", async () => {
    const createShopPayload = {
      shop: {
        name: TEST_SHOP.name,
        addressField1: TEST_SHOP.addressField1,
        addressField2: TEST_SHOP.addressField2,
        addressField3: TEST_SHOP.addressField3,
        postalCode: TEST_SHOP.postalCode,
        image: TEST_SHOP.image,
        rating: TEST_SHOP.rating,
        visible: TEST_SHOP.visible,
        code: TEST_SHOP.code,
      },
    };

    const res = await requestWithSupertest
      .post("/api/shops")
      .set("Content-Type", "application/json")
      .set("Authorization", `Token ${authToken}`)
      .send(createShopPayload);

    expect(res.status).toEqual(201);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("shop");

    await deleteTestShop(res.body.shop.id);
  });

  it("PUT /shop should update test shop", async () => {
    const updateShopPayload = {
      shop: {
        name: `NEW ${TEST_SHOP.name}`,
        addressField1: `NEW ${TEST_SHOP.addressField1}`,
        addressField2: `NEW ${TEST_SHOP.addressField2}`,
        addressField3: `NEW ${TEST_SHOP.addressField3}`,
        postalCode: `NEW ${TEST_SHOP.postalCode}`,
        image: TEST_SHOP.image,
        rating: TEST_SHOP.rating,
        visible: TEST_SHOP.visible,
        code: `5${TEST_SHOP.code}`
      },
    };

    const shop = await createTestShop();
    const res = await requestWithSupertest
      .put(`/api/shops/${shop.id}`)
      .send(updateShopPayload)
      .set("Content-Type", "application/json")
      .set("Authorization", `Token ${authToken}`);

    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("shop");
    expect(res.body.shop.name).toEqual(`NEW ${TEST_SHOP.name}`);
    expect(res.body.shop.addressField1).toEqual(
      `NEW ${TEST_SHOP.addressField1}`
    );
    expect(res.body.shop.addressField2).toEqual(
      `NEW ${TEST_SHOP.addressField2}`
    );
    expect(res.body.shop.addressField3).toEqual(
      `NEW ${TEST_SHOP.addressField3}`
    );
    expect(res.body.shop.postalCode).toEqual(`NEW ${TEST_SHOP.postalCode}`);

    await deleteTestShop(res.body.shop.id);
  });

  it("DELETE /shop should delete test shop", async () => {
    const shop = await createTestShop();

    const res = await requestWithSupertest
      .delete(`/api/shops/${shop.id}`)
      .set("Content-Type", "application/json")
      .set("Authorization", `Token ${authToken}`);

    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("shop");
  });

  afterAll(async () => {
    await deleteTestUser();
  });
});

describe("Unauthenticated Shop Endpoints", () => {
  beforeAll(async () => {});

  it("GET /shop should show all shops", async () => {
    const res = await requestWithSupertest.get("/api/shops");

    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("shops");
  });

  it("POST /shop should not create test shop", async () => {
    const createShopPayload = {
      shop: {
        name: TEST_SHOP.name,
        addressField1: TEST_SHOP.addressField1,
        addressField2: TEST_SHOP.addressField2,
        addressField3: TEST_SHOP.addressField3,
        postalCode: TEST_SHOP.postalCode,
        image: TEST_SHOP.image,
        rating: TEST_SHOP.rating,
        visible: TEST_SHOP.visible,
        code: TEST_SHOP.code
      },
    };

    const res = await requestWithSupertest
      .post("/api/shops")
      .set("Content-Type", "application/json")
      .send(createShopPayload);

    expect(res.status).toEqual(401);
  });

  it("PUT /shop should not update test shop", async () => {
    const updateShopPayload = {
      shop: {
        name: `NEW ${TEST_SHOP.name}`,
        addressField1: `NEW ${TEST_SHOP.addressField1}`,
        addressField2: `NEW ${TEST_SHOP.addressField2}`,
        addressField3: `NEW ${TEST_SHOP.addressField3}`,
        postalCode: `NEW ${TEST_SHOP.postalCode}`,
        image: TEST_SHOP.image,
        rating: TEST_SHOP.rating,
        visible: TEST_SHOP.visible,
        code: TEST_SHOP.code,
      },
    };

    const shop = await createTestShop();
    const res = await requestWithSupertest
      .put(`/api/shops/${shop.id}`)
      .send(updateShopPayload)
      .set("Content-Type", "application/json");

    expect(res.status).toEqual(401);
  });

  it("DELETE /shop should not delete test shop", async () => {
    const shop = await createTestShop();

    const res = await requestWithSupertest
      .delete(`/api/shops/${shop.id}`)
      .set("Content-Type", "application/json");

    expect(res.status).toEqual(401);
  });

  afterAll(async () => {});
});
