import { Badge, Card, Group, Stack, Text, Title } from "@mantine/core";
import type { ResourceConfig } from "../../../types/app-config";
import {
	getEndpointMethod,
	getMethodColor,
	getMethodIcon,
} from "../../../utils/endpoint-helpers";

interface ResourceCardProps {
	resourceKey: string;
	resourceConfig: ResourceConfig;
}

function formatPlural(count: number, singular: string, plural: string): string {
	return `${count} ${count === 1 ? singular : plural}`;
}

export function ResourceCard({
	resourceKey,
	resourceConfig,
}: ResourceCardProps) {
	const endpoints = Object.entries(resourceConfig.endpoints);
	const columnsCount = resourceConfig.list.columns.length;
	const fieldsCount = Object.keys(resourceConfig.form.fields).length;

	return (
		<Card withBorder padding="lg" radius="md" h="100%">
			<Stack gap="md">
				<div>
					<Title order={4} mb={4}>
						{resourceConfig.label}
					</Title>
					{resourceConfig.description && (
						<Text c="dimmed" size="sm">
							{resourceConfig.description}
						</Text>
					)}
					<Text c="dimmed" size="xs" mt={4}>
						Key: <code>{resourceKey}</code>
					</Text>
				</div>

				<Group gap="xs">
					<Badge variant="light" color="blue">
						{formatPlural(columnsCount, "column", "columns")}
					</Badge>
					<Badge variant="light" color="violet">
						{formatPlural(fieldsCount, "field", "fields")}
					</Badge>
					<Badge variant="light" color="teal">
						{formatPlural(endpoints.length, "endpoint", "endpoints")}
					</Badge>
				</Group>

				<div>
					<Text size="sm" fw={500} mb="xs">
						Endpointlar:
					</Text>
					<Stack gap="xs">
						{endpoints.map(([endpointKey, endpointConfig]) => {
							const method = getEndpointMethod(endpointConfig);
							const MethodIcon = getMethodIcon(method);
							const color = getMethodColor(method);

							return (
								<Group key={endpointKey} gap="xs" wrap="nowrap">
									<Badge
										leftSection={<MethodIcon size={12} />}
										color={color}
										variant="light"
										style={{ minWidth: 70 }}
									>
										{method}
									</Badge>
									<Text size="xs" c="dimmed" style={{ flex: 1 }} truncate>
										{endpointConfig.url}
									</Text>
								</Group>
							);
						})}
					</Stack>
				</div>
			</Stack>
		</Card>
	);
}
