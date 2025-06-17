import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/microcms' // microCMSクライアントを定義した場所

type Params = {
  params: {
    id: string
  }
}

export async function GET(req: NextRequest, { params }: Params) {
   const { id } = await params

    const data = await client.get({
      endpoint: 'exhibitions',
      contentId: id,
    })

    return NextResponse.json(data)
}
