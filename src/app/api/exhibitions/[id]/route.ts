import { NextResponse } from "next/server";
import { client } from "@/lib/microcms"

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const data = await client.get({ 
            endpoint: "exhibitions",
            contentId: params.id
        });
        return NextResponse.json(data)
    } catch(error) {
        console.error("Error fetching exhibition:", error);
        return new NextResponse("Not Found", { status: 404 });
    }
}