import type { ResourceConfig } from "../../../shared";
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
  console.log(items);
  return <div>ResourceList</div>;
}
