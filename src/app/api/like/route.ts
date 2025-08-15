import { NextResponse } from "next/server";
import { client } from "@/lib/microcms"; // MicroCMS クライアント
import { serialize, parse } from "cookie";
import { createHmac } from "crypto";


const COOKIE_SECRET = process.env.COOKIE_SECRET || "dev-secret";

// クッキー用ハッシュ生成
function generateLikeHash(endpoint: string, contentId: string, timestamp: number) {
  return createHmac("sha256", COOKIE_SECRET).update(`${endpoint}:${contentId}:${timestamp}`).digest("hex");
}

//クッキー検証
function verifyLikeCookie(cookies: Record<string, string>, endpoint: string, contentId: string) {
  const cookieName = `liked-${endpoint}-${contentId}`;
  const value = cookies[cookieName];
  if (!value) return false;

  const [hash, timestampStr] = value.split(":");
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  const expected = generateLikeHash(endpoint, contentId,timestamp);
  return hash === expected;
}


export async function POST(req: Request) {
  try {
    const { contentId, endpoint } = await req.json();

    if (!contentId || !endpoint) {
      return NextResponse.json(
        { message: "contentIdとendpointが必要です" },
        { status: 400 }
      );
    }

    // Cookie で既に押されたか確認
    const cookieHeader = req.headers.get("cookie") || "";
    const cookies = parse(cookieHeader);
    if (verifyLikeCookie(cookies, endpoint, contentId)) {
      return NextResponse.json({ message: "Already liked" }, { status: 200 });
    }

    // MicroCMS から現在の likes を取得
    const current = await client.get({ endpoint, contentId });
    const newLikes = (current.likes || 0) + 1;

    // MicroCMS を更新
    await client.update({
      endpoint,
      contentId,
      content: { likes: newLikes },
    });

    const timestamp = Date.now();
    const hash = generateLikeHash(endpoint, contentId, timestamp);

    const cookieValue = `${hash}:${timestamp}`;

    // ハッシュ化したCookie をセットして二重押し防止(1時間有効)
    const cookie = serialize(`liked-${endpoint}-${contentId}`, cookieValue, {
      path: "/",
      maxAge: 60 * 60,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    });


    return new NextResponse(JSON.stringify({ likes: newLikes }), {
      status: 200,
      headers: {
        "Set-Cookie": cookie,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "更新に失敗しました" },
      { status: 500 }
    );
  }
}
