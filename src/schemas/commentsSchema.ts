import { z } from "zod";

// クライアントがPOSTするときのスキーマ
export const CreateCommentSchema = z.object({
  targetType: z.enum(["exhibitions", "workshops"]),
  targetId: z.string(),
  content: z.string().min(1, "コメントは必須です"),
});

// APIレスポンスとして返ってくるときのスキーマ
export const CommentSchema = CreateCommentSchema.extend({
  id: z.string(),
  createdAt: z.string(), // または .datetime() にしても可
  updatedAt: z.string(),
  publishedAt: z.string(),
  revisedAt: z.string(),
  targetType: z.enum(["exhibitions", "workshops"]),
  targetId: z.string(),
  content: z.string(),
  
});

export const CommentsResponseSchema = z.object({
  contents: z.array(CommentSchema),
  totalCount: z.number().optional(),
  offset: z.number().optional(),
  limit: z.number().optional(),
});