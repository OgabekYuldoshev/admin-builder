// src/core/pages/resource/create.tsx
import { useParams, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import {
  Container,
  Paper,
  Title,
  Stack,
  Text,
  Group,
  Button,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useResource } from "../../hooks";
import { ResourceForm } from "../../features/resource/components/resource-form";

export function ResourceCreatePage() {
  const { resourceName = "" } = useParams<{ resourceName: string }>();
  const navigate = useNavigate();
  const resource = useResource(resourceName);

  const createMutation = useMutation({
    mutationFn: (data: any) => resource.api.create(data),
    onSuccess: () => handleNavigateBack(),
  });

  function handleNavigateBack() {
    navigate(`/${resourceName}`);
  }

  const handleCancel = () => handleNavigateBack();

  return (
    <Container fluid>
      <Stack gap="xl">
        {/* Header */}
        <Group justify="space-between">
          <div>
            <Title order={3}>{resource.config.metaData.label} yaratish</Title>
            {resource.config.metaData.description && (
              <Text size="sm" c="dimmed" mt="xs">
                {resource.config.metaData.description}
              </Text>
            )}
          </div>
          <Button
            leftSection={<IconArrowLeft size={16} />}
            onClick={handleCancel}
          >
            Orqaga
          </Button>
        </Group>

        {/* Form */}
        <Paper withBorder shadow="sm" p="xl" radius="md">
          <ResourceForm
            resource={resource}
            onSubmit={createMutation.mutate}
            isLoading={createMutation.isPending}
            mode="create"
            showActions
            onCancel={handleCancel}
          />
        </Paper>
      </Stack>
    </Container>
  );
}
