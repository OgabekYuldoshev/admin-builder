import {
  Button,
  Container,
  Flex,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconLock, IconUser } from "@tabler/icons-react";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { z } from "zod";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useAuth } from "../hooks";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { status, login } = useAuth();
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validate: zod4Resolver(loginSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      await login(values);
      notifications.show({
        title: "Success",
        message: "Login successful!",
        color: "green",
      });
      const redirectTo =
        (location.state as { from?: string } | null)?.from || "/";
      navigate(redirectTo, { replace: true });
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed. Please check your credentials.";

      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  if (status === "authenticated") {
    return <Navigate to="/" replace />;
  }

  return (
    <Flex justify="center" align="center" mih="100vh" bg="gray.1">
      <Paper shadow="xl" p="xl" radius="lg" withBorder w={420}>
        <Stack align="center" gap={4} mb="sm">
          <Title order={3}>Admin Panel</Title>
          <Text c="dimmed" size="sm">
            Hisobingizga kirish uchun ma'lumotlaringizni kiriting
          </Text>
        </Stack>

        <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
          <Stack>
            <TextInput
              label="Foydalanuvchi nomi"
              placeholder="Foydalanuvchi nomini kiriting"
              leftSection={<IconUser size={16} />}
              withAsterisk
              {...form.getInputProps("username")}
            />

            <PasswordInput
              label="Parol"
              placeholder="Parolni kiriting"
              leftSection={<IconLock size={16} />}
              withAsterisk
              {...form.getInputProps("password")}
            />

            <Button type="submit" fullWidth loading={loading}>
              Kirish
            </Button>
          </Stack>
        </form>
      </Paper>
    </Flex>
  );
}
