import { NextResponse } from "next/server";
import { client } from "@/lib/microcms"
import { workshopSchema } from "@/schemas/workshopSchema";
import { z } from "zod"

export async function GET() {
    try {
        const data = await client.get({ endpoint: "workshops"})

        //　複数データの場合、Zodで配列として検証
        const result = z.array(workshopSchema).safeParse(data.contents);

        if (!result.success) {
            console.error("Validation error:", result.error.format());
             return NextResponse.json(
                { error: "Invalid data format", details: result.error.format() },
                { status: 500 }
            );
        }


        return NextResponse.json(data.contents)
    } catch (err) {
        console.error("API error:", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}