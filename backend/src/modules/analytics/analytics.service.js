class AnalyticsService {
  constructor(repo) {
    this.repo = repo;
  }

  getSalaryStats(filters) {
    return this.repo.getSalaryStats(filters);
  }
}

module.exports = AnalyticsService;
