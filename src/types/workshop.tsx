import { z } from "zod"
import { WorkshopSchema } from "@/schemas/workshopSchemas";

export type Workshop = z.infer<typeof WorkshopSchema>