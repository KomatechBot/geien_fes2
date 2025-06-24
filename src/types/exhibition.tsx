import { z } from "zod"
import { ExhibitionSchema } from "@/schemas/exhibitionSchemas";


export type Exhibition = z.infer<typeof ExhibitionSchema>