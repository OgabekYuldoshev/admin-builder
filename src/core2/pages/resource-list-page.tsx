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
import { Link, useParams } from "react-router";
import { ResourceList, useResource } from "../features";
import { IconPlus } from "@tabler/icons-react";

export function ResourceListPage() {
  const { resourceName = "" } = useParams<{ resourceName: string }>();

  const { config } = useResource(resourceName);

  return (
    <Container fluid>
      <Flex justify="space-between" align="center">
        <Stack gap={2}>
          <Title order={3}>{config.label}</Title>
          {config.description && (
            <Text size="sm" c="dimmed">
              {config.description}
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
      <ResourceList resourceName={resourceName} />
    </Container>
  );
}
