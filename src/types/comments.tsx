import { z } from "zod"
import { CommentSchema, CommentsDataSchema } from "@/schemas/commentsSchema";

export type Comment = z.infer<typeof CommentSchema>;
export type CommentsData = z.infer<typeof CommentsDataSchema>;