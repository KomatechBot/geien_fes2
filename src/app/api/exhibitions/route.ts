import { NextResponse } from "next/server";
import { client } from "@/lib/microcms"
import { exhibitionSchema } from "@/schemas/exhibitionSchema";
import { z } from "zod"

export async function GET() {
    try {
        const data = await client.get({ endpoint: "exhibitions" });

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