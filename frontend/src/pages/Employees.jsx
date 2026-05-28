import { useEffect, useState } from "react";
import {
  ActionIcon,
  Button,
  Center,
  Group,
  Loader,
  Paper,
  Table,
  Text,
  Title,
} from "@mantine/core";
import {
  fetchEmployees,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from "../services/employee.api";
import EmployeeFormModal from "../components/employee/EmployeeFormModal";
import { useDisclosure } from "@mantine/hooks";
import DeleteEmployeeModal from "../components/employee/DeleteEmployeeModal";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [editEmployee, setEditEmployee] = useState(null);

  // Controls the employee form modal
  const [opened, { open, close }] = useDisclosure(false);

  const loadEmployees = async () => {
    try {
      setLoading(true);

      const res = await fetchEmployees({
        limit: 10,
        offset: 0,
      });
      setEmployees(res.data);
    } catch (err) {
      console.error("Failed to fetch employees", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

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
                <ActionIcon onClick={() => setEditEmployee(emp)}>✏️</ActionIcon>
                <ActionIcon onClick={() => setDeleteId(emp.id)}>🗑</ActionIcon>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

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
