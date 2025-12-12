import z from "zod";

export const resourceListResponseSchema = z.object({
  items: z.array(z.any()),
  total: z.number(),
  limit: z.number(),
});

export type ResourceListResponse = z.infer<typeof resourceListResponseSchema>;
