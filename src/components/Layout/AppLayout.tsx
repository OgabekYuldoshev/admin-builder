import { AppShell, Burger, Group, NavLink, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState(0);

  const navItems = [
    { label: "Dashboard", icon: "📊" },
    { label: "Users", icon: "👥" },
    { label: "Settings", icon: "⚙️" },
    { label: "Analytics", icon: "📈" },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Text fw={700} size="lg">
              Admin Builder
            </Text>
          </Group>
          <Group gap="xs">
            <Text size="sm" c="dimmed">
              Admin Panel
            </Text>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Stack gap="xs">
          {navItems.map((item, index) => (
            <NavLink
              key={item.label}
              label={item.label}
              leftSection={<Text size="lg">{item.icon}</Text>}
              active={index === active}
              onClick={() => setActive(index)}
              variant="subtle"
            />
          ))}
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
