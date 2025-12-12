import { Skeleton } from "@mantine/core";
import { DataTable } from "../../../components";
import { useDataTable } from "../../../hooks";
import type { Resource } from "../../../types";
import { useResourceList } from "../hooks";
import { parseAsInteger, useQueryStates } from "nuqs";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../../../constants";

interface ResourceListProps {
  resource: Resource;
}

export function ResourceList({ resource }: ResourceListProps) {
  const [queries] = useQueryStates({
    page: parseAsInteger.withDefault(DEFAULT_PAGE),
    limit: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  });

  const { items, total, limit, isFetched } = useResourceList({
    params: {
      page: queries.page,
      limit: queries.limit,
    },
    resource,
  });

  const columns = [...resource.config.list.columns];

  const table = useDataTable({
    data: items,
    columns,
    pageCount: Math.ceil(total / limit),
  });

  if (!isFetched) {
    return <Skeleton height={500} />;
  }

  return <DataTable table={table} />;
}
