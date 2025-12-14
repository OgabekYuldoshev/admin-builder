import { useResource } from "../hooks";

interface ResourceListProps {
  resourceName: string;
}
export function ResourceList({ resourceName }: ResourceListProps) {
  const resource = useResource(resourceName);

  console.log(resource);

  return <div>ResourceList</div>;
}
