import { NextResponse } from "next/server";
import { client } from "../../../lib/microcms";

export async function GET() {
    const data = await client.get({ endpoint: "creators"})

    console.log("[API] creators data:", data.contents)

    return NextResponse.json(data.contents)
}