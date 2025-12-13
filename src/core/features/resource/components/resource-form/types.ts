import type { UseFormReturnType } from "@mantine/form";
import type { Resource, ResourceFieldConfig } from "../../../../types";

export interface ResourceFormProps {
  formId?: string;
  resource: Resource;
  initialValues?: Record<string, any>;
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
  onError?: (error: Error) => void;
  isLoading?: boolean;
  mode?: "create" | "update";
  showActions?: boolean;
  onCancel?: () => void;
}

export interface FieldRenderProps {
  fieldKey: string;
  field: ResourceFieldConfig;
  form: UseFormReturnType<Record<string, any>>;
  disabled?: boolean;
}

export interface FormFieldsGroup {
  title?: string;
  description?: string;
  fields: string[];
}
