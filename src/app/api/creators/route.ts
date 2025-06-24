import { NextResponse } from "next/server";
import { client } from "@/lib/microcms";
import { creatorSchema } from "@/schemas/creatorSchema";
import { z } from "zod"


export async function GET() {
    try {
        const data = await client.get({ endpoint: "creators"})

        //複数データの場合、Zodで配列として検証
        const result = z.array(creatorSchema).safeParse(data.contents);

        if (!result.success) {
            console.error("Validation error:", result.error.format());
             return NextResponse.json(
                { error: "Invalid data format", details: result.error.format() },
                { status: 500 }
            );
        }

        return NextResponse.json(result.data);  
    } catch (err) {
        console.error("API error:", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}