import { z } from "zod"

export const filterSchema = z.object({
    searchTerm: z.string().max(100).optional(),
    categoryFilter: z.enum(["all", "デジタルアート", "工芸", "写真", "絵画", "イラスト"]),
    displayFilter: z.enum(["all", "current", "upcoming"])
});

export type FilterParams = z.infer<typeof filterSchema>;