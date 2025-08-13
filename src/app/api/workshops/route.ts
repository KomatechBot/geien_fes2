import { NextResponse } from "next/server";
import { client } from "@/lib/microcms";



export async function GET() {
    try {
        const data = await client.get({ endpoint: "workshops"})

        return NextResponse.json(data.contents)
    } catch (err) {
        console.error("API error:", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}