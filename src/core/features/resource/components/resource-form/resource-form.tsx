import { useCallback, useMemo, useEffect } from "react";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { Stack, Group, Button, Divider, Alert, Text } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import type { ResourceFormProps } from "./types";
import { renderField } from "./field-renderers";
import {
  buildValidationSchema,
  getInitialValues,
  transformFormValues,
  getVisibleFields,
} from "./utils";

export function ResourceForm({
  formId = "resource-form",
  resource,
  initialValues,
  onSubmit,
  onError,
  isLoading = false,
  mode = "create",
  showActions = false,
  onCancel,
}: ResourceFormProps) {
  const fields = resource.config.form.fields;

  const validationSchema = useMemo(
    () => buildValidationSchema(fields),
    [fields]
  );

  const formInitialValues = useMemo(
    () => getInitialValues(fields, initialValues),
    [fields, initialValues]
  );

  const form = useForm({
    mode: "controlled",
    initialValues: formInitialValues,
    validate: zod4Resolver(validationSchema),
    validateInputOnChange: true,
    validateInputOnBlur: true,
  });

  useEffect(() => {
    if (initialValues && mode === "update") {
      form.setValues(getInitialValues(fields, initialValues));
    }
  }, [initialValues, mode, fields]);

  const visibleFields = useMemo(
    () => getVisibleFields(fields, form.values),
    [fields, form.values]
  );

  const handleSubmit = useCallback(
    async (values: Record<string, any>) => {
      try {
        const transformedValues = transformFormValues(values, fields);

        await onSubmit?.(transformedValues);

        if (mode === "create") {
          form.reset();
        }
      } catch (error) {
        console.error("Form submission error:", error);
        onError?.(error as Error);
      }
    },
    [onSubmit, onError, fields, mode, form]
  );

  const renderFormErrors = useCallback(() => {
    if (!form.errors || Object.keys(form.errors).length === 0) {
      return null;
    }

    return (
      <Alert
        icon={<IconAlertCircle size={16} />}
        title="Validatsiya xatolari"
        color="red"
        variant="light"
      >
        <Stack gap="xs">
          {Object.entries(form.errors).map(([key, error]) => (
            <Text key={key} size="sm">
              • {fields[key]?.label || key}: {error}
            </Text>
          ))}
        </Stack>
      </Alert>
    );
  }, [form.errors, fields]);

  const renderFields = useCallback(() => {
    return visibleFields.map(([fieldKey, field]) =>
      renderField({
        fieldKey,
        field,
        form,
        disabled: isLoading,
      })
    );
  }, [visibleFields, form, isLoading]);

  const renderActions = useCallback(() => {
    if (!showActions) return null;

    return (
      <>
        <Divider />
        <Group justify="flex-end">
          {onCancel && (
            <Button color="red" onClick={onCancel} disabled={isLoading}>
              Bekor qilish
            </Button>
          )}
          <Button
            type="submit"
            loading={isLoading}
            disabled={!form.isDirty() || !form.isValid()}
          >
            {mode === "create" ? "Yaratish" : "Saqlash"}
          </Button>
        </Group>
      </>
    );
  }, [showActions, onCancel, isLoading, form, mode]);

  return (
    <form id={formId} onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Stack gap="md">
        {renderFields()}
        {renderFormErrors()}
        {renderActions()}
      </Stack>
    </form>
  );
}
