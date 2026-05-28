import { useEffect, useState } from "react";
import {
  ActionIcon,
  Button,
  Center,
  Group,
  Loader,
  Pagination,
  Paper,
  Select,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure, useDebouncedValue } from "@mantine/hooks";

import {
  fetchEmployees,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "../services/employee.api";
import EmployeeFormModal from "../components/employee/EmployeeFormModal";
import DeleteEmployeeModal from "../components/employee/DeleteEmployeeModal";
import { countryOptions } from "../utils/countries";
import { DEPARTMENTS } from "../constants/employee.constants";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [editEmployee, setEditEmployee] = useState(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 300);

  const [filters, setFilters] = useState({
    country: undefined,
    department: undefined,
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  // Controls the employee form modal
  const [opened, { open, close }] = useDisclosure(false);

  const loadEmployees = async () => {
    try {
      setLoading(true);

      const res = await fetchEmployees({
        limit,
        offset: (page - 1) * limit,
        search: debouncedSearch,
        country: filters.country,
        department: filters.department,
      });

      setEmployees(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Failed to fetch employees", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, [page, limit, filters, debouncedSearch]);

  const handleCreate = async (data) => {
    await createEmployee(data);
    await loadEmployees();
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    await loadEmployees();
  };

  const handleUpdate = async (data) => {
    await updateEmployee(editEmployee.id, data);
    setEditEmployee(null);
    await loadEmployees();
  };

  // 🧠 Loading state
  if (loading) {
    return (
      <Center mt="xl">
        <Loader />
      </Center>
    );
  }

  return (
    <Paper shadow="sm" p="md">
      <Group mb="md" justify="space-between">
        <Text fw={600}>Employees</Text>
        <Button onClick={open}>Add Employee</Button>
      </Group>
      <Group mb="md" justify="space-between">
        <Group grow>
          <TextInput
            placeholder="Search by name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <Select
            placeholder="Country"
            data={countryOptions}
            searchable
            clearable
            value={filters.country}
            onChange={(val) => {
              setFilters((prev) => ({
                ...prev,
                country: val || undefined,
              }));
              setPage(1);
            }}
          />

          <Select
            placeholder="Department"
            data={DEPARTMENTS}
            clearable
            value={filters.department}
            onChange={(val) => {
              setFilters((prev) => ({
                ...prev,
                department: val || undefined,
              }));
              setPage(1);
            }}
          />
        </Group>

        {/* Page size */}
        <Select
          w={120}
          value={String(limit)}
          onChange={(val) => {
            setLimit(Number(val));
            setPage(1);
          }}
          data={[
            { value: "10", label: "10" },
            { value: "20", label: "20" },
            { value: "50", label: "50" },
            { value: "100", label: "100" },
          ]}
        />
      </Group>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Job Title</Table.Th>
            <Table.Th>Department</Table.Th>
            <Table.Th>Country</Table.Th>
            <Table.Th>Salary</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {employees.map((emp) => (
            <Table.Tr key={emp.id}>
              <Table.Td>
                {emp.first_name} {emp.last_name}
              </Table.Td>
              <Table.Td>{emp.job_title}</Table.Td>
              <Table.Td>{emp.department || "-"}</Table.Td>
              <Table.Td>{emp.country}</Table.Td>
              <Table.Td>{emp.salary.toLocaleString()}</Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <ActionIcon onClick={() => setEditEmployee(emp)}>
                    ✏️
                  </ActionIcon>

                  <ActionIcon color="red" onClick={() => setDeleteId(emp.id)}>
                    🗑️
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {/* Pagination */}
      <Pagination
        value={page}
        onChange={setPage}
        total={Math.ceil(total / limit)}
        mt="md"
      />

      {/* Create */}
      <EmployeeFormModal
        opened={opened}
        onClose={close}
        onSuccess={handleCreate}
      />

      {/* Edit */}
      <EmployeeFormModal
        opened={!!editEmployee}
        onClose={() => setEditEmployee(null)}
        onSubmit={handleUpdate}
        initialData={editEmployee}
      />

      <DeleteEmployeeModal
        employeeId={deleteId}
        opened={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </Paper>
  );
}
