import { Container, Flex, Stack, Text, Title } from "@mantine/core";
import { useResource, useSingle } from "../features";
import { useParams } from "react-router";
export function ResourceUpdatePage() {
  const { resourceName = "", id = "" } = useParams<{
    resourceName: string;
    id: string;
  }>();
  const resource = useResource(resourceName);
  const { item, isLoading, error } = useSingle({ resource, id });

  console.log(item);

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
    </Container>
  );
}
