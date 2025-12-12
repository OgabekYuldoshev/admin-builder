import { Flex, Paper, Text, Title } from "@mantine/core";
import { LoginForm } from "../../features";

export function LoginPage() {
  return (
    <Flex justify="center" align="center" h="100vh" bg="gray.1">
      <Paper withBorder shadow="md" p="lg" radius="md" w={400}>
        <Title order={2} ta="center">
          Sign in
        </Title>
        <Text size="sm" color="dimmed" ta="center">
          Enter your email and password to sign in
        </Text>
        <LoginForm />
      </Paper>
    </Flex>
  );
}
