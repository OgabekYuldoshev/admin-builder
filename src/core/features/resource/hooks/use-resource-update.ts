import { useMutation, type MutationOptions } from "@tanstack/react-query";
import type { Resource } from "../../../types";

interface UseResourceUpdateProps extends Omit<MutationOptions, "mutationFn"> {
  id: string;
  resource: Resource;
}
export function useResourceUpdate({
  id,
  resource,
  ...mutationOptions
}: UseResourceUpdateProps) {
  return useMutation({
    mutationFn: (data: any) => resource.api.update(id, data),
    ...mutationOptions,
  });
}
