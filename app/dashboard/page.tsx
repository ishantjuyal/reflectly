import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus } from "lucide-react"

export default async function Dashboard() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/auth/signin")
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Reflectly
                        </h1>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">{session.user.email}</span>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Your Projects</h2>
                        <p className="text-gray-600 mt-1">Manage your feedback widgets</p>
                    </div>
                    <Link
                        href="/dashboard/new"
                        className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl"
                    >
                        <Plus className="w-5 h-5" />
                        New Project
                    </Link>
                </div>

                {projects.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Plus className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects yet</h3>
                        <p className="text-gray-600 mb-6">Create your first project to start collecting feedback</p>
                        <Link
                            href="/dashboard/new"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition"
                        >
                            <Plus className="w-5 h-5" />
                            Create Project
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <Link
                                key={project.id}
                                href={`/dashboard/${project.id}`}
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition border border-gray-100 overflow-hidden group"
                            >
                                <div
                                    className="h-3"
                                    style={{ backgroundColor: project.color }}
                                ></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
                                        {project.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                        reflectly.com/{project.slug}
                                    </p>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">
                                            {project._count.feedbacks} feedback{project._count.feedbacks !== 1 ? 's' : ''}
                                        </span>
                                        <span className="text-indigo-600 font-medium group-hover:translate-x-1 transition-transform">
                                            View →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
