import {
  Modal,
  TextInput,
  NumberInput,
  Button,
  Select,
  Alert,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { DEPARTMENTS } from "../../constants/employee.constants";
import { countryOptions } from "../../utils/countries";

export default function EmployeeFormModal({
  opened,
  onClose,
  onSubmit,
  initialData,
}) {
  const isEdit = !!initialData;

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    job_title: "",
    department: "",
    country: "",
    salary: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🧠 Prefill for edit
  useEffect(() => {
    if (initialData) {
      setForm({
        first_name: initialData.first_name,
        last_name: initialData.last_name,
        email: initialData.email,
        job_title: initialData.job_title,
        department: initialData.department,
        country: initialData.country,
        salary: initialData.salary,
      });
    }
  }, [initialData]);

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

      await onSubmit({
        ...form,
        salary: Number(form.salary),
      });

      onClose();
    } catch (err) {
      const message = err?.response?.data?.error || "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const onCloseModal = () => {
    setError("");
    setLoading(false);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onCloseModal}
      title={isEdit ? "Edit Employee" : "Add Employee"}
    >
      {error && (
        <Alert color="red" mb="sm">
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
        label="Email"
        type="email"
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
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
        data={DEPARTMENTS}
        value={form.department}
        onChange={(val) => handleChange("department", val)}
        mt="sm"
      />

      <Select
        label="Country"
        data={countryOptions}
        searchable
        limit={10}
        value={form.country}
        onChange={(val) => handleChange("country", val)}
        mt="sm"
      />

      <NumberInput
        label="Salary"
        value={form.salary}
        onChange={(val) => handleChange("salary", val)}
        mt="sm"
      />

      <Button fullWidth mt="md" loading={loading} onClick={handleSubmit}>
        {isEdit ? "Update" : "Create"}
      </Button>
    </Modal>
  );
}
