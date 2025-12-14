import { Card, Group, Text } from "@mantine/core";
import type { TablerIconsProps } from "@tabler/icons-react";

interface StatisticsCardProps {
  label: string;
  value: string | number;
  icon: React.ComponentType<TablerIconsProps>;
  iconColor?: string;
  isText?: boolean;
}

export function StatisticsCard({
  label,
  value,
  icon: Icon,
  iconColor = "var(--mantine-color-blue-6)",
  isText = false,
}: StatisticsCardProps) {
  const valueSize = isText ? "sm" : "xl";
  const valueStyle = isText ? { wordBreak: "break-all" } : undefined;

  return (
    <Card withBorder padding="lg" radius="md">
      <Group justify="space-between">
        <div style={{ flex: 1, minWidth: 0 }}>
          <Text c="dimmed" size="sm" fw={500}>
            {label}
          </Text>
          <Text fw={700} size={valueSize} mt="xs" style={valueStyle}>
            {value}
          </Text>
        </div>
        <Icon size={40} stroke={1.5} color={iconColor} />
      </Group>
    </Card>
  );
}

