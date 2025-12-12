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
import { useResource } from "../../hooks";
import { Link, useParams } from "react-router";
import { IconPlus } from "@tabler/icons-react";
import { ResourceList } from "../../features";

export function ResourceListPage() {
  const { resourceName = "" } = useParams<{ resourceName: string }>();
  const resource = useResource(resourceName);

  const metaData = resource.config.metaData;

  return (
    <Container fluid>
      <Flex justify="space-between" align="center">
        <Stack gap={2}>
          <Title order={3}>{metaData.label}</Title>
          {metaData.description && (
            <Text size="sm" c="dimmed">
              {metaData.description}
            </Text>
          )}
        </Stack>
        <Group>
          <Button
            component={Link}
            to={`/${resourceName}/create`}
            leftSection={<IconPlus size={16} />}
          >
            Yangi yaratish
          </Button>
        </Group>
      </Flex>
      <Space h="md" />
      <ResourceList resource={resource} />
    </Container>
  );
}
