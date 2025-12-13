
import {
  TextInput,
  NumberInput,
  Textarea,
  Select,
  Switch,
} from "@mantine/core";
import type { FieldRenderProps } from "./types";
import {
  isFieldRequired,
  getFieldDescription,
  getFieldPlaceholder,
} from "./utils";
import type {
  NumberField,
  SelectField,
  TextAreaField,
} from "../../../../types/config";
import type { ReactNode } from "react";

/**
 * Render text input field
 */
export function renderTextField({
  fieldKey,
  field,
  form,
  disabled = false,
}: FieldRenderProps) {
  return (
    <TextInput
      key={fieldKey}
      label={field.label}
      placeholder={getFieldPlaceholder(field)}
      description={getFieldDescription(field)}
      disabled={disabled}
      withAsterisk={isFieldRequired(field)}
      {...form.getInputProps(fieldKey)}
    />
  );
}

/**
 * Render number input field
 */
export function renderNumberField({
  fieldKey,
  field,
  form,
  disabled = false,
}: FieldRenderProps) {
  const numberField = field as NumberField;
  return (
    <NumberInput
      key={fieldKey}
      label={field.label}
      placeholder={getFieldPlaceholder(field)}
      description={getFieldDescription(field)}
      disabled={disabled}
      withAsterisk={isFieldRequired(field)}
      min={numberField.min}
      max={numberField.max}
      {...form.getInputProps(fieldKey)}
    />
  );
}

/**
 * Render textarea field
 */
export function renderTextareaField({
  fieldKey,
  field,
  form,
  disabled = false,
}: FieldRenderProps) {
  const textareaField = field as TextAreaField;
  return (
    <Textarea
      key={fieldKey}
      label={field.label}
      placeholder={getFieldPlaceholder(field)}
      description={getFieldDescription(field)}
      disabled={disabled}
      withAsterisk={isFieldRequired(field)}
      rows={textareaField.rows ?? 4}
      {...form.getInputProps(fieldKey)}
    />
  );
}

/**
 * Render select field
 */
export function renderSelectField({
  fieldKey,
  field,
  form,
  disabled = false,
}: FieldRenderProps) {
  const selectField = field as SelectField;
  return (
    <Select
      key={fieldKey}
      label={field.label}
      placeholder={getFieldPlaceholder(field)}
      description={getFieldDescription(field)}
      disabled={disabled}
      withAsterisk={isFieldRequired(field)}
      data={selectField.options}
      searchable
      clearable
      {...form.getInputProps(fieldKey)}
    />
  );
}

/**
 * Render switch field
 */
export function renderSwitchField({
  fieldKey,
  field,
  form,
  disabled = false,
}: FieldRenderProps) {
  return (
    <Switch
      key={fieldKey}
      label={field.label}
      description={getFieldDescription(field)}
      disabled={disabled}
      {...form.getInputProps(fieldKey, { type: "checkbox" })}
    />
  );
}

/**
 * Render date input field
 */
export function renderDateField({
  fieldKey,
  field,
  form,
  disabled = false,
}: FieldRenderProps) {
  return (
    <TextInput
      key={fieldKey}
      label={field.label}
      placeholder={getFieldPlaceholder(field)}
      description={getFieldDescription(field)}
      disabled={disabled}
      withAsterisk={isFieldRequired(field)}
      type="date"
      {...form.getInputProps(fieldKey)}
    />
  );
}

/**
 * Main field renderer - routes to appropriate render function
 */
export function renderField(props: FieldRenderProps): ReactNode | null {
  const { field } = props;

  switch (field.type) {
    case "text":
      return renderTextField(props);
    case "number":
      return renderNumberField(props);
    case "textarea":
      return renderTextareaField(props);
    case "select":
      return renderSelectField(props);
    case "switch":
      return renderSwitchField(props);
    case "date":
      return renderDateField(props);
    default:
      console.warn(`Unknown field type: ${(field as any).type}`);
      return null;
  }
}
