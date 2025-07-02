import { z } from "zod";

// カテゴリ一覧（必要なら共通化も検討可）
const categoryOptions = [
  "all",
  "デジタルアート",
  "工芸",
  "写真",
  "絵画",
  "イラスト",
  "ゲーム",
  "その他",
] as const;

const displayOptions = ["all", "current", "upcoming"] as const;

export const ExhibitionFilterSchema = z.object({
  searchTerm: z.string().max(50).optional(), // 入力文字列（任意）
  categoryFilter: z.enum(categoryOptions),
  displayFilter: z.enum(displayOptions),
});

// 型定義
export type ExhibitionFilter = z.infer<typeof ExhibitionFilterSchema>;
