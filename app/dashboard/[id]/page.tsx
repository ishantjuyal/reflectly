import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import ProjectDetailClient from "./ProjectDetailClient"

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/auth/signin")
    }

    const { id } = await params

    const project = await prisma.project.findUnique({
        where: {
            id: id,
            ownerId: session.user.id,
        },
        include: {
            feedbacks: {
                orderBy: {
                    upvotes: "desc",
                },
            },
        },
    })

    if (!project) {
        notFound()
    }

    const publicUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/feedback/${project.slug}`
    const embedCode = `<script src="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/embed.js" data-project="${project.slug}"></script>`

    return <ProjectDetailClient project={project} publicUrl={publicUrl} embedCode={embedCode} />
}
