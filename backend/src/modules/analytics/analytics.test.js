const request = require("supertest");
const app = require("../../app");

describe("Analytics API", () => {
  it("should return salary distribution", async () => {
    const response = await request(app).get(
      "/api/analytics/salary-distribution",
    );
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should return department comparison", async () => {
    const response = await request(app).get(
      "/api/analytics/department-comparison",
    );
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
