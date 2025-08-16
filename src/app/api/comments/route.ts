
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Comment, CommentsData } from "@/types/comments";
import { serialize, parse } from "cookie";
import { createHmac } from "crypto";
import { blacklistWords } from "@/lib/blacklist";

const jsonFile = path.join(process.cwd(), "data/comments.json");
const COOKIE_SECRET = process.env.COOKIE_SECRET || "dev-secret";


//JSON 読み書き関数
const readComments = (): CommentsData => {
  try {
    if (fs.existsSync(jsonFile)) {
      const content = fs.readFileSync(jsonFile, "utf-8").trim();
      if (!content) return {};
      return JSON.parse(content) as CommentsData;
    }
  } catch (err) {
    console.error("Failed to read JSON:", err);
    return {};
  }
  return {};
};

const writeComments = (data: CommentsData) => {
  fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2));
};


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



export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const endpoint = searchParams.get("endpoint") ?? "";
  const contentId = searchParams.get("contentId") ?? "";

  const commentsData = readComments();
  const comments = commentsData[endpoint]?.[contentId] || [];

  return NextResponse.json({ comments });
}



export async function POST(req: NextRequest) {
  const body = await req.json();
  const { endpoint, contentId, content } = body;

  if (!content) return NextResponse.json({ error: "コメントが空です" }, { status: 400 });


  if (containsBlacklistedWord(content)) {
    return NextResponse.json({ error: "不適切なワードが含まれています。" }, { status: 400 })
  }
  
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = parse(cookieHeader);

  // 二重送信チェック
  if (verifyCommentCookie(cookies, endpoint, contentId)) {
    return NextResponse.json({ message: "すでにコメント済みです" }, { status: 200 });
  }


  const commentsData = readComments();
  if (!commentsData[endpoint]) commentsData[endpoint] = {};
  if (!commentsData[endpoint][contentId]) commentsData[endpoint][contentId] = [];

  const newComment: Comment = {
    id: Date.now().toString(),
    content,
    createdAt: new Date().toISOString(),
  };

  commentsData[endpoint][contentId].push(newComment);
  writeComments(commentsData);

  // Cookie 作成（1時間有効）
  const timestamp = Date.now();
  const hash = generateCommentHash(endpoint, contentId, timestamp);
  const cookieValue = `${hash}:${timestamp}`;

  const cookie = serialize(`commented-${endpoint}-${contentId}`, cookieValue, {
    path: "/",
    maxAge: 60 * 60,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });


  return new NextResponse(JSON.stringify({ comment: newComment }), {
    status: 200,
    headers: {
      "Set-Cookie": cookie,
      "Content-Type": "application/json",
    },
  });
}
