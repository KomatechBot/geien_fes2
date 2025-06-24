import { z } from "zod";
import { ExhibitionSchema } from "./exhibitionSchemas";
import { WorkshopSchema } from "./workshopSchemas";

export const CreatorSchema = z.object({
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
  exhibitions: z.array(ExhibitionSchema),
  upcomingEvents: z.array(WorkshopSchema),
  achievements: z.string(),
});
