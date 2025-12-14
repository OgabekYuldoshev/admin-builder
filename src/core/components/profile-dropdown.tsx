import {
	ActionIcon,
	Avatar,
	Divider,
	Group,
	Menu,
	Text,
	UnstyledButton,
} from "@mantine/core";
import {
	IconChevronDown,
	IconLogout,
	IconSettings,
	IconUser,
} from "@tabler/icons-react";
import { useMemo } from "react";
import { useAuth } from "../hooks";

export function ProfileDropdown() {
	const { user, logout, status } = useAuth();

	const displayName = useMemo(() => {
		if (!user) return "Guest";
		return user.name || user.fullName || user.username || "User";
	}, [user]);

	const initials = useMemo(() => {
		return displayName
			.split(" ")
			.map((part: string) => part[0])
			.join("")
			.slice(0, 2)
			.toUpperCase();
	}, [displayName]);

	return (
		<Menu width={220} position="bottom-end" shadow="md" withArrow>
			<Menu.Target>
				<UnstyledButton>
					<Group gap={8}>
						<Avatar radius="xl" size={32} color="blue">
							{initials}
						</Avatar>
						<Text size="sm" fw={600}>
							{displayName}
						</Text>
						<ActionIcon variant="subtle" size="sm">
							<IconChevronDown size={14} />
						</ActionIcon>
					</Group>
				</UnstyledButton>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Label>Profile</Menu.Label>
				<Menu.Item leftSection={<IconUser size={14} />} disabled>
					{status === "authenticated" ? "View profile" : "Not signed in"}
				</Menu.Item>
				<Menu.Item leftSection={<IconSettings size={14} />} disabled>
					Settings
				</Menu.Item>
				<Divider />
				<Menu.Item
					color="red"
					leftSection={<IconLogout size={14} />}
					onClick={() => logout()}
				>
					Chiqish
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}

