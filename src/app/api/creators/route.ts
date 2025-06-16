import { NextResponse } from "next/server";
import { client } from "../../../lib/microcms";

export async function GET() {
    const data = await client.get({ endpoint: "creators"})
    return NextResponse.json(data.contents)
}