const AnalyticsService = require("../../src/modules/analytics/analytics.service");

describe("AnalyticsService", () => {
  let repo;
  let service;

  beforeEach(() => {
    repo = {
      getSalaryStats: jest.fn(),
    };

    service = new AnalyticsService(repo);
  });

  it("should return salary stats", () => {
    repo.getSalaryStats.mockReturnValue({
      avg_salary: 50000,
      min_salary: 20000,
      max_salary: 100000,
      median_salary: 45000,
    });

    const result = service.getSalaryStats({});

    expect(repo.getSalaryStats).toHaveBeenCalledWith({});
    expect(result.avg_salary).toBe(50000);
  });
});
