import { Text, Title } from "@mantine/core";

export function PageHeader() {
  return (
    <div>
      <Title order={2} mb="md">
        Statistika
      </Title>
      <Text c="dimmed" size="sm">
        Resurslar va endpointlar haqida umumiy ma'lumot
      </Text>
    </div>
  );
}

