import { z } from "zod";

export const WorkshopSchema = z.object({
  id: z.string(),
  title: z.string(),
  instructor: z.string(),
  date: z.string(), // ISO8601の日付フォーマットに限定したいなら z.string().refine(...) を使用可能
  time: z.string(), // "HH:mm" フォーマットにしたい場合も refine() や正規表現で制限可能
  duration: z.number(), // 分単位など明確にしたければコメント等で補足
  location: z.string(),
  difficulty: z.string(), 
  description: z.string(),
  materials: z.string(),
  requirements: z.string(),
  createdAt: z.string(), // ISO8601 形式で日時が入ることを期待するなら refine でチェックも可能
});


