import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/microcms' // microCMSクライアントを定義した場所



export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }>}) {
  try {
    const { id } = await params

    const data = await client.get({ endpoint: 'exhibitions', contentId: id, })

    return NextResponse.json(data)
  } catch (err) {
      console.error("API error:", err);
      return new NextResponse("Internal Server Error", { status: 500 });
  }
}
