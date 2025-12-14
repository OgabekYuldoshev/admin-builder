import { Grid, Stack, Title } from "@mantine/core";
import { ResourceCard } from "./resource-card";
import type { AppConfig } from "../../../types/app-config";

interface ResourcesSectionProps {
  resources: [string, AppConfig["resources"][string]][];
}

export function ResourcesSection({ resources }: ResourcesSectionProps) {
  return (
    <Stack gap="md">
      <div>
        <Title order={3} mb="md">
          Resurslar
        </Title>
      </div>
      <Grid>
        {resources.map(([resourceKey, resourceConfig]) => (
          <Grid.Col key={resourceKey} span={{ base: 12, md: 6, lg: 4 }}>
            <ResourceCard
              resourceKey={resourceKey}
              resourceConfig={resourceConfig}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
}

