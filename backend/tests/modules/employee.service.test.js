const EmployeeService = require("../../src/modules/employee/employee.service");

describe("EmployeeService", () => {
  let repo;
  let service;

  beforeEach(() => {
    repo = {
      createEmployee: jest.fn(),
      getEmployees: jest.fn(),
      updateEmployee: jest.fn(),
      deleteEmployee: jest.fn(),
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

  describe("updateEmployee", () => {
    it("should update employee successfully", () => {
      repo.updateEmployee = jest.fn().mockReturnValue({
        id: 1,
        first_name: "Updated",
      });

      const result = service.updateEmployee(1, {
        first_name: "Updated",
      });

      expect(repo.updateEmployee).toHaveBeenCalledWith(1, {
        first_name: "Updated",
      });

      expect(result.first_name).toBe("Updated");
    });

    it("should throw error if employee not found", () => {
      repo.updateEmployee = jest.fn().mockReturnValue(null);

      expect(() => service.updateEmployee(1, { first_name: "Test" })).toThrow(
        "Employee not found",
      );
    });

    it("should throw error for invalid salary", () => {
      expect(() => service.updateEmployee(1, { salary: -100 })).toThrow(
        "Invalid salary",
      );
    });
  });

  describe("deleteEmployee", () => {
    it("should delete employee successfully", () => {
      repo.deleteEmployee = jest.fn().mockReturnValue(true);

      const result = service.deleteEmployee(1);

      expect(repo.deleteEmployee).toHaveBeenCalledWith(1);
      expect(result).toEqual({ success: true });
    });

    it("should throw error if employee not found", () => {
      repo.deleteEmployee = jest.fn().mockReturnValue(false);

      expect(() => service.deleteEmployee(1)).toThrow("Employee not found");
    });
  });
});
