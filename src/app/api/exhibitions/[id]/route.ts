import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/microcms' // microCMSクライアントを定義した場所
import { exhibitionSchema } from '@/schemas/exhibitionSchema'
import { z } from 'zod'


export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }>}) {
  try {
    const { id } = await params

    const data = await client.get({ endpoint: 'exhibitions', contentId: id, })

    const result = z.array(exhibitionSchema).safeParse(data.contents)

    if (!result.success) {
        console.error("Validation error:", result.error.format());
         return NextResponse.json(
            { error: "Invalid data format", details: result.error.format() },
            { status: 500 }
          );
    } 

    return NextResponse.json(result.data)
  } catch (err) {
      console.error("API error:", err);
      return new NextResponse("Internal Server Error", { status: 500 });
  }
}
