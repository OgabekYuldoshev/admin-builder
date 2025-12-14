import { z, ZodType } from "zod";
import type { FormFieldConfig, Resource } from "../../../types";
import {
  NumberInput,
  Select,
  Stack,
  Switch,
  Textarea,
  TextInput,
} from "@mantine/core";
import { Fragment, useMemo } from "react";
import { zod4Resolver } from "mantine-form-zod-resolver";

import { useForm, type UseFormReturnType } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
interface ResourceFormProps {
  resource: Resource;
}

export function ResourceForm({ resource }: ResourceFormProps) {
  const validationSchema = useMemo(() => buildFormSchema(resource), [resource]);
  const initialValues = useMemo(() => buildInitialValues(resource), [resource]);

  const form = useForm({
    initialValues,
    validate: zod4Resolver(validationSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });
  
  return (
    <Stack>
      {Object.entries(resource.config.form.fields).map(([key, field]) => (
        <Fragment key={key}>{renderFormFields({ key, form, field })}</Fragment>
      ))}
    </Stack>
  );
}

function renderFormFields({
  key,
  form,
  field,
}: {
  key: string;
  form: UseFormReturnType<any>;
  field: FormFieldConfig;
}) {
  const commonProps = {
    ...form.getInputProps(key),
    key: form.key(key),
    label: field.label,
    description: field.description,
    placeholder: field.placeholder ?? field.label,
    withAsterisk: isFieldRequired(field),
  };

  switch (field.type) {
    case "text":
      return <TextInput {...commonProps} />;
    case "textarea":
      return <Textarea {...commonProps} />;
    case "select":
      return <Select {...commonProps} data={[]} />;
    case "switch":
      return <Switch {...commonProps} />;
    case "number":
      return <NumberInput {...commonProps} />;
    case "date":
      return <DatePickerInput {...commonProps} />;
    default:
      console.warn(`Unsupported field type: ${field}`);
      return null;
  }
}

function buildFormSchema(resource: Resource) {
  const schema = {} as Record<string, ZodType>;

  for (const [key, field] of Object.entries(resource.config.form.fields)) {
    schema[key] = field.validationSchema;
  }

  return z.object(schema);
}

function buildInitialValues(resource: Resource) {
  const initialValues = {} as Record<string, any>;

  for (const [key, field] of Object.entries(resource.config.form.fields)) {
    initialValues[key] = field.defaultValue ?? getInitialValueByType(field);
  }

  return initialValues;
}

function getInitialValueByType(field: FormFieldConfig) {
  switch (field.type) {
    case "text":
      return "";
    case "textarea":
      return "";
    case "select":
      return "";
    case "switch":
      return false;
    case "number":
    case "date":
      return null;
    default:
      return null;
  }
}

const fieldRequiredCache = new WeakMap<FormFieldConfig, boolean>();

export function isFieldRequired(field: FormFieldConfig): boolean {
  if (fieldRequiredCache.has(field)) {
    return fieldRequiredCache.get(field)!;
  }

  const result = field.validationSchema.safeParse(getInitialValueByType(field));
  const isRequired = !result.success;

  fieldRequiredCache.set(field, isRequired);

  return isRequired;
}
