import { parseAsInteger, useQueryStates } from "nuqs";
import { DataTable } from "../../../components";
import { useDataTable } from "../../../hooks";
import { useList } from "../hooks";
import { appConfig } from "../../../config";
import { Skeleton } from "@mantine/core";
import type { Resource } from "../../../types";

interface ResourceListProps {
  resource: Resource;
}
export function ResourceList({ resource }: ResourceListProps) {
  const [queries] = useQueryStates({
    page: parseAsInteger.withDefault(appConfig.list.defaultPage),
    limit: parseAsInteger.withDefault(appConfig.list.defaultPageSize),
  });

  const { items, total, limit, isFetched } = useList({
    resource,
    params: { page: queries.page, limit: queries.limit },
  });

  const table = useDataTable({
    data: items,
    columns: resource.config.list.columns,
    pageCount: Math.ceil(total / limit),
  });

  if (!isFetched) {
    return <Skeleton height={500} />;
  }

  return <DataTable table={table} />;
}
