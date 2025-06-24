// schemas/creatorSchema.ts
import { z } from "zod"
import { exhibitionSchema } from "./exhibitionSchema"
import { workshopSchema } from "./workshopSchema"

export const creatorSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  description: z.string(),
  longDescription: z.string(),
  specialties: z.string(),
  memberCount: z.number(),
  establishedYear: z.number(),
  contact: z.string(),
  website: z.string().url(),
  socialMedia: z.string(),
  exhibitions: z.array(exhibitionSchema),
  upcomingEvents: z.array(workshopSchema),
  achievements: z.string(),
})
