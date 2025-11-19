import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const body = await request.json()
        const { name, slug, color } = body

        if (!name || !slug) {
            return new NextResponse("Missing required fields", { status: 400 })
        }

        // Check if slug is already taken
        const existingProject = await prisma.project.findUnique({
            where: { slug }
        })

        if (existingProject) {
            return new NextResponse("Slug already taken", { status: 400 })
        }

        const project = await prisma.project.create({
            data: {
                name,
                slug,
                color: color || "#000000",
                ownerId: session.user.id,
            }
        })

        return NextResponse.json(project)
    } catch (error) {
        console.log(error, 'PROJECT_CREATE_ERROR')
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const projects = await prisma.project.findMany({
            where: {
                ownerId: session.user.id,
            },
            include: {
                _count: {
                    select: { feedbacks: true },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        })

        return NextResponse.json(projects)
    } catch (error) {
        console.log(error, 'PROJECTS_GET_ERROR')
        return new NextResponse("Internal Error", { status: 500 })
    }
}
