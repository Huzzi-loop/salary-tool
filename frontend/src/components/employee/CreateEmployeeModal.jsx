import {
  Modal,
  TextInput,
  NumberInput,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { useState } from "react";

export default function CreateEmployeeModal({ opened, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    job_title: "",
    department: "",
    country: "",
    salary: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
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
      console.error("Create failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Employee">
      <div style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} />

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

        <TextInput
          label="Department"
          value={form.department}
          onChange={(e) => handleChange("department", e.target.value)}
          mt="sm"
        />

        <TextInput
          label="Country"
          value={form.country}
          onChange={(e) => handleChange("country", e.target.value)}
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
