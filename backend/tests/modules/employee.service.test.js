const EmployeeService = require("../../src/modules/employee/employee.service");

describe("EmployeeService", () => {
  let repo;
  let service;

  beforeEach(() => {
    repo = {
      createEmployee: jest.fn(),
      getEmployees: jest.fn(),
    };

    service = new EmployeeService(repo);
  });

  describe("createEmployee", () => {
    it("should create employee successfully", () => {
      repo.createEmployee.mockReturnValue({ id: 1 });

      const result = service.createEmployee({
        first_name: "John",
        last_name: "Doe",
        job_title: "Engineer",
        country: "India",
        salary: 50000,
      });

      expect(repo.createEmployee).toHaveBeenCalled();
      expect(result.id).toBe(1);
    });

    it("should throw error if name is missing", () => {
      expect(() =>
        service.createEmployee({
          job_title: "Engineer",
          country: "India",
          salary: 50000,
        }),
      ).toThrow("Name is required");
    });

    it("should throw error for negative salary", () => {
      expect(() =>
        service.createEmployee({
          first_name: "John",
          last_name: "Doe",
          job_title: "Engineer",
          country: "India",
          salary: -10,
        }),
      ).toThrow("Invalid salary");
    });
  });

  describe("getEmployees", () => {
    it("should return employees with pagination", () => {
      repo.getEmployees.mockReturnValue([{ id: 1 }]);

      const result = service.getEmployees({ limit: 10, offset: 0 });

      expect(repo.getEmployees).toHaveBeenCalledWith({
        limit: 10,
        offset: 0,
      });

      expect(result.length).toBe(1);
    });

    it("should use default pagination values", () => {
      repo.getEmployees.mockReturnValue([]);

      service.getEmployees({});

      expect(repo.getEmployees).toHaveBeenCalledWith({
        limit: 10,
        offset: 0,
      });
    });
  });
});
