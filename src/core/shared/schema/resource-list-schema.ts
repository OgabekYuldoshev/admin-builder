import z from "zod";

export const resourceListSchema = z.object({
	items: z.array(z.any()),
	total: z.number(),
	limit: z.number(),
});

export type ResourceList = z.infer<typeof resourceListSchema>;
