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
import { useNavigate } from "react-router";
import { z } from "zod";
import { useAppState } from "../app-state";
import { zod4Resolver } from "mantine-form-zod-resolver";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const { httpClient, appConfig } = useAppState();
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
      const response = await httpClient.post(appConfig.auth.login.url, {
        username: values.username,
        password: values.password,
      });

      const transformedData = appConfig.auth.login.responseTransform
        ? appConfig.auth.login.responseTransform(response.data)
        : response.data;

      // Store tokens if available
      if (transformedData.accessToken) {
        localStorage.setItem("accessToken", transformedData.accessToken);
      }
      if (transformedData.refreshToken) {
        localStorage.setItem("refreshToken", transformedData.refreshToken);
      }

      notifications.show({
        title: "Success",
        message: "Login successful!",
        color: "green",
      });

      navigate("/");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
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
