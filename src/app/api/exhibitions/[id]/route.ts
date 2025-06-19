import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/microcms' // microCMSクライアントを定義した場所


export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }>}) {
   const { id } = await params

    const data = await client.get({
      endpoint: 'exhibitions',
      contentId: id,
    })

    return NextResponse.json(data)
}
