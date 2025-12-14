import { Group, Text, ThemeIcon } from "@mantine/core";
import { IconLayoutDashboard } from "@tabler/icons-react";

export function Logo() {
	return (
		<Group gap="xs">
			<ThemeIcon variant="light" radius="md" color="blue" size={32}>
				<IconLayoutDashboard size={18} />
			</ThemeIcon>
			<Text fw={700} size="md">
				Admin Builder
			</Text>
		</Group>
	);
}

