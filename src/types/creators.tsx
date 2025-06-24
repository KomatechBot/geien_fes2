import { z } from "zod"
import { CreatorSchema } from "@/schemas/creatorSchema";

export type Creator = z.infer<typeof CreatorSchema>