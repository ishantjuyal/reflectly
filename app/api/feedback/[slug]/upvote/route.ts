import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await params // Not using slug but need to await for Next.js
        const body = await request.json()
        const { feedbackId } = body

        if (!feedbackId) {
            return new NextResponse("Feedback ID is required", { status: 400 })
        }

        const feedback = await prisma.feedback.update({
            where: { id: feedbackId },
            data: {
                upvotes: {
                    increment: 1,
                },
            },
        })

        return NextResponse.json(feedback)
    } catch (error) {
        console.log(error, 'UPVOTE_ERROR')
        return new NextResponse("Internal Error", { status: 500 })
    }
}
