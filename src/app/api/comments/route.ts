
import { NextRequest, NextResponse } from "next/server";
import { serialize, parse } from "cookie";
import { createHmac } from "crypto";
import { blacklistWords } from "@/lib/blacklist";
import { client } from "@/lib/microcms"

import { CreateCommentSchema, CommentSchema, CommentsResponseSchema } from "@/schemas/commentsSchema";

const COOKIE_SECRET = process.env.COOKIE_SECRET || "dev-secret";


// Cookie ハッシュ生成・検証
function generateCommentHash(endpoint: string, contentId: string, timestamp: number) {
  return createHmac("sha256", COOKIE_SECRET)
    .update(`${endpoint}:${contentId}:${timestamp}`)
    .digest("hex");
}

function verifyCommentCookie(cookies: Record<string,string>, endpoint: string, contentId: string) {
  const cookieName = `commented-${endpoint}-${contentId}`;
  const value = cookies[cookieName];
  if (!value) return false;

  const [hash, timestampStr] = value.split(":");
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  const expected = generateCommentHash(endpoint, contentId, timestamp);
  return hash === expected;
}

// ブラックリストの単語に当てはまったら、自動で投稿をはじく機能
function containsBlacklistedWord(comment: string): boolean {
  return blacklistWords.some(word => comment.includes(word.toLowerCase()))
}


// GET: コメント一覧を取得
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const targetType = searchParams.get("targetType");
    const targetId = searchParams.get("targetId");

    if (!targetType || !targetId) {
      return NextResponse.json({ comments: [] }, { status: 200 }); 
    }

    const data = await client.getAllContents({
      endpoint: "comments",
      queries: {
        filters: `targetType[equals]${targetType},targetId[equals]${targetId}`,
        orders: "-createdAt",
      },
    });

    // Zodで検証（safeParse でエラーを捕まえてフォールバックを返す）
    const parsed = CommentsResponseSchema.safeParse(data);
    if (!parsed.success) {
      console.error("CommentsResponseSchema validation failed:", parsed.error.format());
      // フロントの期待に合わせて必ずJSON を返す（空配列フォールバック）
      return NextResponse.json({ comments: [] }, { status: 200 });
    }

    // validated.data.contents を配列として返す（フロントが扱いやすい形）
    return NextResponse.json({ comments: parsed.data.contents }, { status: 200 });
  } catch (err) {
    console.error("GET /api/comments failed:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


// POST: コメントを追加
export async function POST(req: NextRequest) {
  const body = await req.json();

  // バリデーション
  const parsedBody = CreateCommentSchema.parse(body);

  const { targetType, targetId, content } = parsedBody;

  if (!content) return NextResponse.json({ error: "コメントが空です" }, { status: 400 });


  if (containsBlacklistedWord(content)) {
    return NextResponse.json({ error: "不適切なワードが含まれています。" }, { status: 400 })
  }
  
  // 二重送信チェック
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);
  if (verifyCommentCookie(cookies, targetType, targetId)) {
    return NextResponse.json({ message: "すでにコメント済みです" }, { status: 200 });
  }


  // コメント保存
  const created = await client.create({
    endpoint: "comments",
    content: {
      targetType,
      targetId,
      content,
    },
  });
    
  // コメント保存（microCMSへ）
  const newComment = await client.get({
    endpoint: "comments",
    contentId: created.id,
  });

  // microCMS から返ってきたデータも検証
  const validatedComment = CommentSchema.parse(newComment);


  // Cookie 作成（1時間有効）
  const timestamp = Date.now();
  const hash = generateCommentHash(targetType, targetId, timestamp);
  const cookieValue = `${hash}:${timestamp}`;

  const cookie = serialize(`commented-${targetType}-${targetId}`, cookieValue, {
    path: "/",
    maxAge: 60 * 60,
    httpOnly: true,
    sameSite: "lax",
    secure: true  
  });


  return new NextResponse(JSON.stringify({ comment: validatedComment }), {
    status: 200,
    headers: {
      "Set-Cookie": cookie,
      "Content-Type": "application/json",
    },
  });
}
