import { z } from "zod"
import { CreateCommentSchema, CommentSchema, CommentsResponseSchema } from "@/schemas/commentsSchema";

export type CreateComment = z.infer<typeof CreateCommentSchema>;
export type Comment = z.infer<typeof CommentSchema>;
export type CommentsResponse = z.infer<typeof CommentsResponseSchema>;
