import {
	Button,
	Group,
	NumberInput,
	Select,
	Stack,
	Switch,
	Textarea,
	TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { type UseFormReturnType, useForm } from "@mantine/form";
import { useDidUpdate } from "@mantine/hooks";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { Fragment, useMemo } from "react";
import { type ZodType, z } from "zod";
import type { FormFieldConfig, Resource } from "../../../types";

interface ResourceFormProps {
	mode: "create" | "edit";
	resource: Resource;
	onCancel?: () => void;
	onSubmit: (values: any) => Promise<any>;
	initialData?: Record<string, any>;
}

export function ResourceForm({
	mode,
	resource,
	onCancel,
	onSubmit,
	initialData,
}: ResourceFormProps) {
	const validationSchema = useMemo(() => buildFormSchema(resource), [resource]);
	const initialValues = useMemo(() => {
		if (initialData && mode === "edit") {
			return buildInitialValuesFromData(resource, initialData);
		}
		return buildInitialValues(resource);
	}, [resource, initialData, mode]);

	const form = useForm({
		initialValues,
		validate: zod4Resolver(validationSchema),
		validateInputOnBlur: true,
		validateInputOnChange: true,
	});

	useDidUpdate(() => {
		if (initialData && mode === "edit" && form.isDirty()) {
			const values = buildInitialValuesFromData(resource, initialData);
			form.setValues(values);
			form.resetDirty();
		}
	}, [initialData, mode, resource, form]);

	const isLoading = form.submitting;

	return (
		<form onSubmit={form.onSubmit(onSubmit)} noValidate>
			<Stack>
				{Object.entries(resource.config.form.fields).map(([key, field]) => (
					<Fragment key={key}>
						{renderFormFields({ key, form, field })}
					</Fragment>
				))}

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
			</Stack>
		</form>
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
		key: form.key(key),
		label: field.label,
		description: field.description,
		placeholder: field.placeholder ?? field.label,
		withAsterisk: isFieldRequired(field),
		...form.getInputProps(key),
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
		return fieldRequiredCache.get(field) ?? false;
	}

	const result = field.validationSchema.safeParse(getInitialValueByType(field));
	const isRequired = !result.success;

	fieldRequiredCache.set(field, isRequired);

	return isRequired;
}

function buildInitialValuesFromData(
	resource: Resource,
	data: Record<string, any>,
) {
	const initialValues = {} as Record<string, any>;

	for (const [key, field] of Object.entries(resource.config.form.fields)) {
		initialValues[key] =
			data[key] !== undefined && data[key] !== null
				? data[key]
				: (field.defaultValue ?? getInitialValueByType(field));
	}

	return initialValues;
}
