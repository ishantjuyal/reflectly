import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params
        const project = await prisma.project.findUnique({
            where: { slug },
            select: {
                id: true,
                name: true,
                color: true,
            },
        })

        if (!project) {
            return new NextResponse("Project not found", { status: 404 })
        }

        const feedbacks = await prisma.feedback.findMany({
            where: { projectId: project.id },
            orderBy: { upvotes: "desc" },
        })

        return NextResponse.json({ project, feedbacks })
    } catch (error) {
        console.log(error, 'FEEDBACK_GET_ERROR')
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params
        const project = await prisma.project.findUnique({
            where: { slug },
        })

        if (!project) {
            return new NextResponse("Project not found", { status: 404 })
        }

        const body = await request.json()
        const { content } = body

        if (!content || !content.trim()) {
            return new NextResponse("Content is required", { status: 400 })
        }

        const feedback = await prisma.feedback.create({
            data: {
                content: content.trim(),
                projectId: project.id,
            },
        })

        return NextResponse.json(feedback)
    } catch (error) {
        console.log(error, 'FEEDBACK_CREATE_ERROR')
        return new NextResponse("Internal Error", { status: 500 })
    }
}
