import { Modal, Text, Button, Group } from "@mantine/core";
import { useState } from "react";

export default function DeleteEmployeeModal({
  employeeId,
  opened,
  onClose,
  onConfirm,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError("");
      await onConfirm(employeeId);
      onClose();
    } catch (err) {
      const message = err?.response?.data?.error || "Failed to delete employee";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Confirm Delete">
      {error && (
        <div
          style={{
            background: "#e03131",
            color: "white",
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "10px",
          }}
        >
          {error}
        </div>
      )}

      <Text size="sm" mb="md">
        Are you sure you want to delete this employee?
      </Text>

      <Group justify="flex-end">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>

        <Button color="red" loading={loading} onClick={handleDelete}>
          Delete
        </Button>
      </Group>
    </Modal>
  );
}
