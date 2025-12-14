import {
	Alert,
	Container,
	Flex,
	Loader,
	Paper,
	Space,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router";
import { ResourceForm, useResource, useSingle, useUpdate } from "../features";
export function ResourceUpdatePage() {
	const navigate = useNavigate();
	const { resourceName = "", id = "" } = useParams<{
		resourceName: string;
		id: string;
	}>();
	const resource = useResource(resourceName);
	const { item, isFetched, isError, error } = useSingle({ resource, id });

	const { mutateAsync } = useUpdate({
		resource,
		id,
		onSuccess: () => {
			notifications.show({
				title: "Yangilandi",
				message: `${resource.config.label} muvaffaqiyatli yangilandi`,
			});
		},
		onError: (error) => {
			notifications.show({
				title: "Xatolik",
				message: error.message,
				color: "red",
			});
		},
	});

	if (!isFetched) {
		return (
			<Container fluid>
				<Flex justify="center" align="center" h={400}>
					<Loader size="sm" />
				</Flex>
			</Container>
		);
	}

	if (isError && error) {
		return (
			<Container fluid>
				<Alert
					icon={<IconAlertCircle size={16} />}
					title="Xatolik"
					color="red"
					variant="light"
				>
					{error.message || "Ma'lumotlarni yuklashda xatolik yuz berdi"}
				</Alert>
			</Container>
		);
	}

	if (!item) {
		return (
			<Container fluid>
				<Alert
					icon={<IconAlertCircle size={16} />}
					title="Ma'lumot topilmadi"
					color="yellow"
					variant="light"
				>
					Bu ma'lumot topilmadi yoki o'chirilgan bo'lishi mumkin
				</Alert>
			</Container>
		);
	}

	return (
		<Container fluid>
			<Flex justify="space-between" align="center">
				<Stack gap={2}>
					<Title order={3}>{resource.config.label}</Title>
					{resource.config.description && (
						<Text size="sm" c="dimmed">
							{resource.config.description}
						</Text>
					)}
				</Stack>
			</Flex>
			<Space h="md" />
			<Paper withBorder p="md" radius="md">
				<ResourceForm
					resource={resource}
					mode="edit"
					initialData={item}
					onSubmit={mutateAsync}
					onCancel={() => navigate(-1)}
				/>
			</Paper>
		</Container>
	);
}
