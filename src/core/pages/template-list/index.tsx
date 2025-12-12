import { useParams } from "react-router";
import { useEntityConfig } from "../../shared";

export function TemplateListPage() {
  const { entityName = "" } = useParams<{ entityName: string }>();
  const entity = useEntityConfig(entityName);
  console.log(entity);
  return <div>EntityListPage</div>;
}
