import { useMutation, type MutationOptions } from "@tanstack/react-query";
import type { Resource } from "../../../types";

interface UseResourceCreateProps extends Omit<MutationOptions, "mutationFn"> {
  resource: Resource;
}
export function useResourceCreate({
  resource,
  ...mutationOptions
}: UseResourceCreateProps) {
  return useMutation({
    mutationFn: (data: any) => resource.api.create(data),
    ...mutationOptions,
  });
}
