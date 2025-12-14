import { Container, Flex, Space, Title } from "@mantine/core";
import { useResource } from "../features/resource/hooks";
import { useParams } from "react-router";
import { ResourceForm } from "../features";

export function ResourceCreatePage() {
  const { resourceName = "" } = useParams<{ resourceName: string }>();
  const resource = useResource(resourceName);

  return (
    <Container fluid>
      <Flex justify="space-between" align="center">
        <Title order={3}>{resource.config.label} yaratish</Title>
      </Flex>
      <Space h="md" />
      <ResourceForm resource={resource} />
    </Container>
  );
}
