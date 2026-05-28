import { useEffect, useState } from "react";
import { Center, Loader, Title } from "@mantine/core";

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

  return <Title order={2}>Employees</Title>;
}
