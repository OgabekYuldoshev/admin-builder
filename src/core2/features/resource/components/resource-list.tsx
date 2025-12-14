import { parseAsInteger, useQueryStates } from "nuqs";
import { DataTable } from "../../../components";
import { useDataTable } from "../../../hooks";
import { useList, useResource } from "../hooks";
import { appConfig } from "../../../config";
import { Skeleton } from "@mantine/core";

interface ResourceListProps {
  resourceName: string;
}
export function ResourceList({ resourceName }: ResourceListProps) {
  const resource = useResource(resourceName);

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
