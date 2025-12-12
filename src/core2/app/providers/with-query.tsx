import { QueryClientProvider } from "@tanstack/react-query";
import type { ComponentType } from "react";
import { queryClient } from "../config";

export function withQuery<P extends object = object>(
  Component: ComponentType<P>
) {
  return function QueryWrapper(props: P) {
    return (
      <QueryClientProvider client={queryClient}>
        <Component {...props} />
      </QueryClientProvider>
    );
  };
}
