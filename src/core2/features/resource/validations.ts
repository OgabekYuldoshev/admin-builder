import z from "zod";

export const resourceListResponseValidationSchema = z.object({
  items: z.array(z.any()),
  total: z.number(),
  limit: z.number(),
});

export const resourceSingleResponseValidationSchema = z.object({
  item: z.any(),
});