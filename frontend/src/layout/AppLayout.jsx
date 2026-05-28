import { AppShell, Burger, Group, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useLocation } from "react-router-dom";

export default function AppLayout({ children }) {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();

  return (
    <AppShell
      padding="md"
      navbar={{
        width: 220,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      header={{ height: 60 }}
    >
      {/* HEADER */}
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} size="sm" />
          <strong>Salary Tool</strong>
        </Group>
      </AppShell.Header>

      {/* SIDEBAR */}
      <AppShell.Navbar p="md">
        <NavLink
          label="Dashboard"
          component={Link}
          to="/"
          active={location.pathname === "/"}
        />

        <NavLink
          label="Employees"
          component={Link}
          to="/employees"
          active={location.pathname === "/employees"}
        />
      </AppShell.Navbar>

      {/* MAIN */}
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
