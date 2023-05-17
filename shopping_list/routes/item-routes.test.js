process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let candy = { name: "gummies", price: 2.99 };

beforeEach(function () {
  items.push({ name: "gummies", price: 2.99 });
});

afterEach(function () {
  // make sure this *mutates*, not redefines, `items`
  items.length = 0;
});

describe("GET /items", function () {
  test("gets a list of all items", async function () {
    const resp = await request(app).get("/items");
    console.log("1");
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual([candy]);
  });
});

describe("POST /items", function () {
  test("Creating new item", async function () {
    const resp = await request(app).post("/items").send({
      name: "donuts",
      price: 5.99,
    });
    console.log("2");
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual({
      added: {
        name: "donuts",
        price: 5.99,
      },
    });
  });
});

describe("GET /items/:name", function () {
  test("gets item with name in url", async function () {
    const resp = await request(app).get(`/items/${candy.name}`);
    console.log("3");
    expect(resp.statusCode).toBe(200);
    console.log(items);
    console.log(candy);
    console.log(resp.body);
    expect(resp.body).toEqual({ item: candy });
  });
  test("gets item with wrong name in url", async function () {
    console.log("4");
    const resp = await request(app).get(`/items/chocolate`);
    expect(resp.statusCode).toBe(404);
  });
});

describe("PATCH /item/:name", function () {
  test("Updates a single item", async function () {
    const resp = await request(app).patch(`/items/${candy.name}`).send({
      name: "gummy worms",
      price: 3.0,
    });
    console.log(candy);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      item: {
        name: "gummy worms",
        price: 3.0,
      },
    });
  });

  test("Responds with 404 if id invalid", async function () {
    const resp = await request(app).patch(`/items/chocolate`);
    expect(resp.statusCode).toBe(404);
  });
});

describe("DELETE /items/:name", function () {
  test("Deletes a single a item", async function () {
    const resp = await request(app).delete(`/items/${candy.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "Deleted" });
  });
});
