import { NavLink, Stack } from "@mantine/core";
import { useMemo } from "react";
import { Link, useLocation } from "react-router";
import { useResourcesConfig } from "../../shared";

interface NavItem {
  label: string;
  href: string;
}

export function Sidebar() {
  const resourcesConfig = useResourcesConfig();
  const { pathname } = useLocation();
  const navItems = useMemo(() => {
    const items: NavItem[] = [
      {
        label: "Home",
        href: "/",
      },
    ];

    for (const [resourceName, resourceConfig] of Object.entries(
      resourcesConfig
    )) {
      items.push({
        label: resourceConfig.label,
        href: `/${resourceName}`,
      });
    }

    return items;
  }, [resourcesConfig]);

  return (
    <Stack gap="xs">
      {navItems.map((item) => (
        <NavLink
          component={Link}
          key={item.label}
          label={item.label}
          to={item.href}
          variant="filled"
          active={pathname === item.href}
        />
      ))}
    </Stack>
  );
}
