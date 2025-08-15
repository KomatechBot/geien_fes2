import { z } from "zod";

export const CommentSchema = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.string().datetime(),
});

export const CommentsDataSchema = z.record(
  z.record(z.array(CommentSchema))
);

