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
  const { items } = useResourceList({
    metaData: {
      resourceName,
      resourceConfig,
    },
  });

  const table = useDataTable({
    data: items,
    columns: [
      {
        id: "id",
        header: "ID",
        accessorKey: "id",
      },
    ],
  });

  return <DataTable table={table} />;
}
