import { useEffect, useState } from "react";
import { Center, Loader, Paper, Table, Title } from "@mantine/core";
import { fetchEmployees } from "../services/employee.api";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEmployees = async () => {
    try {
      setLoading(true);

      const res = await fetchEmployees({
        limit: 10,
        offset: 0,
      });
      console.log("Fetched employees:", res.data);
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
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Job Title</Table.Th>
            <Table.Th>Department</Table.Th>
            <Table.Th>Country</Table.Th>
            <Table.Th>Salary</Table.Th>
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
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
}
