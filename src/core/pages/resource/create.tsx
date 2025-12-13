import { Link, useParams } from "react-router";
import { useResource } from "../../hooks";
import {
  Button,
  Container,
  Flex,
  Group,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";

export function ResourceCreatePage() {
  const { resourceName = "" } = useParams<{ resourceName: string }>();
  const resource = useResource(resourceName);

  const metaData = resource.config.metaData;
  return (
    <Container fluid>
      <Stack gap={2}>
        <Title order={3}>{metaData.label}</Title>
        {metaData.description && (
          <Text size="sm" c="dimmed">
            {metaData.description}
          </Text>
        )}
      </Stack>
      <Space h="md" />
    </Container>
  );
}
