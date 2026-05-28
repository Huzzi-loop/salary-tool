import { useState } from "react";
import {
  Modal,
  TextInput,
  NumberInput,
  Button,
  LoadingOverlay,
  Text,
  Alert,
} from "@mantine/core";
import { Select } from "@mantine/core";
import { DEPARTMENTS } from "../../constants/employee.constants";
import { countryOptions } from "../../utils/countries";

export default function CreateEmployeeModal({ opened, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    job_title: "",
    department: "",
    country: "",
    salary: "",
  });

  const handleChange = (field, value) => {
    setError("");
    setForm((prev) => ({
      ...prev,
      [field]: value || "",
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");
      await onSuccess({
        ...form,
        salary: Number(form.salary),
      });

      // reset form
      setForm({
        first_name: "",
        last_name: "",
        job_title: "",
        department: "",
        country: "",
        salary: "",
      });

      onClose();
    } catch (err) {
      const message =
        err?.response?.data?.error || "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Employee">
      <div style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} />
        {error && (
          <Alert color="red" mb="sm" radius="md">
            {error}
          </Alert>
        )}
        <TextInput
          label="First Name"
          value={form.first_name}
          onChange={(e) => handleChange("first_name", e.target.value)}
        />

        <TextInput
          label="Last Name"
          value={form.last_name}
          onChange={(e) => handleChange("last_name", e.target.value)}
          mt="sm"
        />

        <TextInput
          label="Job Title"
          value={form.job_title}
          onChange={(e) => handleChange("job_title", e.target.value)}
          mt="sm"
        />

        <Select
          label="Department"
          placeholder="Select department"
          data={DEPARTMENTS}
          value={form.department}
          onChange={(value) => handleChange("department", value)}
          mt="sm"
        />

        <Select
          label="Country"
          placeholder="Select country"
          data={countryOptions}
          searchable
          limit={10}
          nothingFoundMessage="No country found"
          value={form.country}
          onChange={(value) => handleChange("country", value)}
          mt="sm"
        />

        <NumberInput
          label="Salary"
          value={form.salary}
          onChange={(val) => handleChange("salary", val)}
          mt="sm"
        />

        <Button
          fullWidth
          mt="md"
          onClick={handleSubmit}
          disabled={!form.first_name || !form.last_name}
        >
          Create
        </Button>
      </div>
    </Modal>
  );
}
