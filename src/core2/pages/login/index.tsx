import { Flex, Paper, Space, Text, Title } from "@mantine/core";

export function LoginPage() {
  return (
    <Flex justify="center" align="center" h="100vh" bg="gray.1">
      <Flex direction="column">
        <Title order={2} ta="center">
          Tizimga kirish
        </Title>
        <Text size="sm" color="dimmed" ta="center">
          Email va parolingizni kiriting
        </Text>
        <Space h="lg" />
        <Paper withBorder shadow="md" p="xl" radius="md" w={400}>
          LoginPage
        </Paper>
      </Flex>
    </Flex>
  );
}
