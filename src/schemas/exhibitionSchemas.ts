import { z } from "zod";

export const ExhibitionSchema = z.object({
  id: z.string(),
  title: z.string(),
  creator: z.string(),
  creatorGroup: z.string(),
  image: z.object({
    url: z.string().url(),
    height: z.number(),
    width: z.number(),
  }),
  images: z.array(
    z.object({
      url: z.string().url(),
      height: z.number().optional(),
      width: z.number().optional(),
    })
  ),
  category: z.string(),
  isCurrentlyDisplayed: z.boolean(),
  description: z.string(),
  longDescription: z.string(),
  location: z.string(),
  displayPeriod: z.string(),
  openingHours: z.string(),
  tags: z.string(),
  createdAt: z.string(), 
});

