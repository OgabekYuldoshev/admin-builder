import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router";
import { Logo } from "../logo";
import { ProfileDropdown } from "../profile-dropdown";
import { Sidebar } from "../sidebar/sidebar";

export function AppLayout() {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
			padding="md"
		>
			<AppShell.Header>
				<Group h="100%" px="md" justify="space-between">
					<Group>
						<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
						<Logo />
					</Group>
					<ProfileDropdown />
				</Group>
			</AppShell.Header>
			<AppShell.Navbar p="md">
				<Sidebar />
			</AppShell.Navbar>
			<AppShell.Main bg="gray.1">
				<Outlet />
			</AppShell.Main>
		</AppShell>
	);
}
