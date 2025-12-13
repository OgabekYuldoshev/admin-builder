import { z, type ZodSchema } from "zod";
import type { ResourceFieldConfig } from "../../../../types";

export function buildValidationSchema(
  fields: Record<string, ResourceFieldConfig>
): z.ZodObject<any> {
  const schemaShape: Record<string, ZodSchema> = {};

  for (const [key, field] of Object.entries(fields)) {
    schemaShape[key] = field.validationSchema;
  }

  return z.object(schemaShape);
}

export function getInitialValues(
  fields: Record<string, ResourceFieldConfig>,
  providedValues?: Record<string, any>
): Record<string, any> {
  const values: Record<string, any> = {};

  for (const [key, field] of Object.entries(fields)) {
    if (providedValues && key in providedValues) {
      values[key] = providedValues[key];
    } else if ("defaultValue" in field && field.defaultValue !== undefined) {
      values[key] = field.defaultValue;
    } else {
      values[key] = getTypeDefaultValue(field.type);
    }
  }

  return values;
}

export function getTypeDefaultValue(fieldType: string): any {
  switch (fieldType) {
    case "number":
      return null;
    case "switch":
      return false;
    case "select":
      return null;
    case "date":
      return "";
    case "textarea":
    case "text":
    default:
      return "";
  }
}

export function isFieldVisible(
  field: ResourceFieldConfig,
  formValues: Record<string, any>
): boolean {
  if (!("visible" in field)) return true;
  if (typeof field.visible === "boolean") return field.visible;
  if (typeof field.visible === "function") {
    return field.visible(formValues);
  }
  return true;
}

export function transformFormValues(
  values: Record<string, any>,
  fields: Record<string, ResourceFieldConfig>
): Record<string, any> {
  const transformed = { ...values };

  for (const [key, field] of Object.entries(fields)) {
    if ("transform" in field && field.transform && key in transformed) {
      transformed[key] = field.transform(transformed[key], transformed);
    }
  }

  return transformed;
}

export function getVisibleFields(
  fields: Record<string, ResourceFieldConfig>,
  formValues: Record<string, any>
): Array<[string, ResourceFieldConfig]> {
  return Object.entries(fields).filter(([_, field]) =>
    isFieldVisible(field, formValues)
  );
}

export function isFieldRequired(field: ResourceFieldConfig): boolean {
  return !field.validationSchema.isOptional();
}

export function getFieldDescription(
  field: ResourceFieldConfig
): string | undefined {
  if ("description" in field) return field.description;
  return undefined;
}

export function getFieldPlaceholder(
  field: ResourceFieldConfig
): string | undefined {
  if ("placeholder" in field) return field.placeholder;
  return undefined;
}
