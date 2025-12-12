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
import { IconPlus } from "@tabler/icons-react";
import { Link, useParams } from "react-router";
import { ResourceList } from "../../features";
import { useResourceConfig } from "../../shared";

export function TemplateListPage() {
  const { resourceName = "" } = useParams<{ resourceName: string }>();

  const resourceConfig = useResourceConfig(resourceName);

  return (
    <Container fluid>
      <Flex justify="space-between" align="center">
        <Stack gap={2}>
          <Title order={2}>{resourceConfig.label}</Title>
          {resourceConfig.description && (
            <Text size="sm" c="dimmed">
              {resourceConfig.description}
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
      <ResourceList {...{ resourceConfig, resourceName }} />
    </Container>
  );
}
