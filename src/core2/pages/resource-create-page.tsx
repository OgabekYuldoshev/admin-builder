import { Container, Flex, Space, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useNavigate, useParams } from "react-router";
import { ResourceForm, useCreate, useResource } from "../features";

export function ResourceCreatePage() {
	const navigate = useNavigate();
	const { resourceName = "" } = useParams<{ resourceName: string }>();
	const resource = useResource(resourceName);

	const { mutateAsync } = useCreate({
		resource,
		onSuccess: () => {
			navigate(-1);
			notifications.show({
				title: "Yaratildi",
				message: `${resource.config.label} yaratildi`,
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

	return (
		<Container fluid>
			<Flex justify="space-between" align="center">
				<Title order={3}>{resource.config.label} yaratish</Title>
			</Flex>
			<Space h="md" />
			<ResourceForm
				mode="create"
				resource={resource}
				onSubmit={mutateAsync}
				onCancel={() => navigate(-1)}
			/>
		</Container>
	);
}
