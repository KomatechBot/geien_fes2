// schemas/workshopSchema.ts
import { z } from "zod"

export const workshopSchema = z.object({
  id: z.string(),
  title: z.string(),
  instructor: z.string(),
  date: z.string(), // ISO形式（例：2025-07-01）
  time: z.string(),
  duration: z.number(),
  location: z.string(),
  difficulty: z.string(),
  description: z.string(),
  materials: z.string(),
  requirements: z.string(),
  createdAt: z.string(),
})
