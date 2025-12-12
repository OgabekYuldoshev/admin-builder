import { Button, Grid, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCallback } from "react";

export function LoginForm() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = useCallback((values: any) => {
    console.log(values);
  }, []);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Grid>
        <Grid.Col span={12}>
          <TextInput placeholder="Email" {...form.getInputProps("email")} />
        </Grid.Col>
        <Grid.Col span={12}>
          <PasswordInput
            placeholder="Password"
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
