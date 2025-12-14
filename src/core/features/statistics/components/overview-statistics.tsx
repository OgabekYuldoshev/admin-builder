import { Grid } from "@mantine/core";
import {
	IconApi,
	IconDatabase,
	IconList,
	IconServer,
} from "@tabler/icons-react";
import type { Statistics } from "../hooks/use-statistics";
import { StatisticsCard } from "./statistics-card";

interface OverviewStatisticsProps {
	statistics: Statistics;
}

const STATISTICS_CONFIG = [
	{
		key: "resources" as const,
		label: "Jami Resurslar",
		icon: IconDatabase,
		iconColor: "var(--mantine-color-blue-6)",
		getValue: (stats: Statistics) => stats.totalResources,
	},
	{
		key: "endpoints" as const,
		label: "Jami Endpointlar",
		icon: IconApi,
		iconColor: "var(--mantine-color-green-6)",
		getValue: (stats: Statistics) => stats.totalEndpoints,
	},
	{
		key: "baseURL" as const,
		label: "Base URL",
		icon: IconServer,
		iconColor: "var(--mantine-color-violet-6)",
		getValue: (stats: Statistics) => stats.baseURL,
	},
	{
		key: "columns" as const,
		label: "Jami Columnlar",
		icon: IconList,
		iconColor: "var(--mantine-color-orange-6)",
		getValue: (stats: Statistics) => stats.totalColumns,
	},
] as const;

export function OverviewStatistics({ statistics }: OverviewStatisticsProps) {
	return (
		<Grid>
			{STATISTICS_CONFIG.map((config) => {
				const isBaseURL = config.key === "baseURL";
				return (
					<Grid.Col key={config.key} span={{ base: 12, sm: 6, md: 3 }}>
						<StatisticsCard
							label={config.label}
							value={config.getValue(statistics)}
							icon={config.icon}
							iconColor={config.iconColor}
							isText={isBaseURL}
						/>
					</Grid.Col>
				);
			})}
		</Grid>
	);
}
