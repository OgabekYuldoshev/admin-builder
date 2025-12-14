import { Container, Stack } from "@mantine/core";
import { useAppState } from "../app-state";
import {
  OverviewStatistics,
  PageHeader,
  ResourcesSection,
  useStatistics,
} from "../features/statistics";

export function HomePage() {
  const { appConfig } = useAppState();
  const statistics = useStatistics(appConfig);
  const resources = Object.entries(appConfig.resources);

  return (
    <Container fluid>
      <Stack gap="xl">
        <PageHeader />
        <OverviewStatistics statistics={statistics} />
        <ResourcesSection resources={resources} />
      </Stack>
    </Container>
  );
}

