import { useEffect, useState } from "react";
import { Card, Text, Group, Loader, Center } from "@mantine/core";

import { fetchSalaryStats } from "../services/analytics.api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      setLoading(true);
      const res = await fetchSalaryStats();
      setStats(res.data);
    } catch (err) {
      console.error(err);
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const formatSalary = (value) => {
    if (value == null) return "--";
    return `₹${Math.round(value).toLocaleString()}`;
  };

  if (loading)
    return (
      <Center mb="md">
        <Loader size="sm" />
      </Center>
    );

  return (
    <>
      <Group grow>
        <Card shadow="sm" p="lg">
          <Text size="sm" c="dimmed">
            Average Salary
          </Text>
          <Text fw={700} size="xl">
            {formatSalary(stats?.avg_salary)}
          </Text>
        </Card>

        <Card shadow="sm" p="lg">
          <Text size="sm" c="dimmed">
            Minimum Salary
          </Text>
          <Text fw={700} size="xl">
            {formatSalary(stats?.min_salary)}
          </Text>
        </Card>

        <Card shadow="sm" p="lg">
          <Text size="sm" c="dimmed">
            Maximum Salary
          </Text>
          <Text fw={700} size="xl">
            {formatSalary(stats?.max_salary)}
          </Text>
        </Card>
      </Group>
    </>
  );
}
