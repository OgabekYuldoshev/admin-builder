import { Button, Grid, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useCallback } from "react";
import type z from "zod";
import { loginFormSchema } from "../schema";

export function LoginForm() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(loginFormSchema),
  });

  const handleSubmit = useCallback(
    (values: z.infer<typeof loginFormSchema>) => {
      console.log(values);
    },
    []
  );

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Grid>
        <Grid.Col span={12}>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="Emailingizni kiriting"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <PasswordInput
            withAsterisk
            label="Parol"
            placeholder="Parolingizni kiriting"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Button type="submit" fullWidth>
            Login
          </Button>
        </Grid.Col>
      </Grid>
    </form>
  );
}
