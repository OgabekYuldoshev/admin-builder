import { NavLink, Stack, useMantineTheme } from "@mantine/core";
import { useMemo } from "react";
import { useAppState } from "../../lib";
import { Link, useLocation } from "react-router";

type NavItem = {
  label: string;
  href: string;
};

export function Sidebar() {
  const theme = useMantineTheme();
  const { pathname } = useLocation();
  const appState = useAppState();
  const navItems = useMemo(() => {
    const items: NavItem[] = [
      {
        label: "Home",
        href: "/",
      },
    ];

    for (const [resourceKey, resourceConfig] of Object.entries(
      appState.config.resources
    )) {
      items.push({
        label: resourceConfig.metaData.label,
        href: `/${resourceKey}`,
      });
    }

    return items;
  }, [appState.config]);

  return (
    <Stack gap="xs">
      {navItems.map((item) => (
        <NavLink
          styles={{
            root: {
              borderRadius: theme.radius.sm,
            },
          }}
          component={Link}
          key={item.label}
          label={item.label}
          to={item.href}
          variant="light"
          active={pathname === item.href}
        />
      ))}
    </Stack>
  );
}
