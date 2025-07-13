const request = require("supertest");
const express = require("express");
const itemsRouter = require("../items");
const dataUtils = require("../../utils/dataUtils");

jest.mock("../../utils/dataUtils");

const app = express();
app.use(express.json());
app.use("/api/items", itemsRouter);

const mockItems = [
  { id: 1, name: "Test", price: 100 },
  { id: 2, name: "Tes2", price: 200 },
];

describe("Items Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/items", () => {
    it("returns items list", async () => {
      dataUtils.readData.mockResolvedValue(mockItems);

      const res = await request(app).get("/api/items");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockItems);
    });

    it("handles read error", async () => {
      dataUtils.readData.mockRejectedValue(new Error("fail"));

      const res = await request(app).get("/api/items");

      expect(res.statusCode).toBe(500);
    });
  });

  describe("POST /api/items", () => {
    it("creates new item", async () => {
      const newItem = { name: "Item", category: "Tools", price: 10 };
      dataUtils.readData.mockResolvedValue([]);
      dataUtils.writeData.mockResolvedValue();

      const res = await request(app).post("/api/items").send(newItem);

      expect(res.statusCode).toBe(201);
      expect(dataUtils.writeData).toHaveBeenCalled();
    });

    it("rejects invalid input", async () => {
      const res = await request(app).post("/api/items").send({});

      expect(res.statusCode).toBe(400);
    });

    it("handles write error", async () => {
      const item = { name: "X", category: "Tools", price: 99 };
      dataUtils.readData.mockResolvedValue([]);
      dataUtils.writeData.mockRejectedValue(new Error("fail"));

      const res = await request(app).post("/api/items").send(item);

      expect(res.statusCode).toBe(500);
    });
  });
});
