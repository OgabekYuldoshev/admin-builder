import { Skeleton } from "@mantine/core";
import { parseAsInteger, useQueryStates } from "nuqs";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  PAGE_KEY,
  PAGE_SIZE_KEY,
} from "../../../constants";
import { type ResourceConfig, useDataTable } from "../../../shared";
import { DataTable } from "../../../widgets/data-table";
import { useResourceList } from "../hooks";

interface ResourceListProps {
  resourceName: string;
  resourceConfig: ResourceConfig;
}

export function ResourceList({
  resourceName,
  resourceConfig,
}: ResourceListProps) {
  const [queries] = useQueryStates({
    [PAGE_KEY]: parseAsInteger.withDefault(DEFAULT_PAGE),
    [PAGE_SIZE_KEY]: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  });

  const { items, total, isFetched } = useResourceList({
    params: {
      [PAGE_KEY]: queries[PAGE_KEY],
      [PAGE_SIZE_KEY]: queries[PAGE_SIZE_KEY],
    },
    metaData: {
      resourceName,
      resourceConfig,
    },
  });

  const table = useDataTable({
    data: items,
    columns: resourceConfig.list.columns || [],
    pageCount: Math.ceil(total / queries[PAGE_SIZE_KEY]),
  });

  if (!isFetched) {
    return <Skeleton height={500} />;
  }

  return <DataTable table={table} />;
}
