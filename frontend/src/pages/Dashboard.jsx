import { useEffect, useState } from "react";
import {
  Card,
  Text,
  Group,
  Loader,
  Center,
  Select,
  Stack,
} from "@mantine/core";

import { fetchSalaryStats } from "../services/analytics.api";
import { DEPARTMENTS } from "../constants/employee.constants";
import { countryOptions } from "../utils/countries";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});

  const loadStats = async () => {
    try {
      setLoading(true);
      const res = await fetchSalaryStats(filters);
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
  }, [filters]);

  const handleFilterChange = (field, value) => {
    const updated = {
      ...filters,
      [field]: value || undefined,
    };

    setFilters(updated);
  };

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
    <Stack mb="md">
      <Group grow>
        <Select
          placeholder="Filter by country"
          data={countryOptions}
          searchable
          clearable
          value={filters.country}
          onChange={(val) => handleFilterChange("country", val)}
        />

        <Select
          placeholder="Filter by department"
          data={DEPARTMENTS}
          clearable
          value={filters.department}
          onChange={(val) => handleFilterChange("department", val)}
        />
      </Group>

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
    </Stack>
  );
}
