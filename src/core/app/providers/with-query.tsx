import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../config";

export function withQuery(Component: React.ComponentType<any>) {
  return (props: any) => (
    <QueryClientProvider client={queryClient}>
      <Component {...props} />
    </QueryClientProvider>
  );
}
