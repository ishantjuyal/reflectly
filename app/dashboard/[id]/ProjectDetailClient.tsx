'use client'

import Link from "next/link"
import { ArrowLeft, Copy, ExternalLink, ThumbsUp } from "lucide-react"

interface Feedback {
    id: string
    content: string
    upvotes: number
    createdAt: Date
}

interface Project {
    id: string
    name: string
    slug: string
    color: string
    feedbacks: Feedback[]
}

interface Props {
    project: Project
    publicUrl: string
    embedCode: string
}

export default function ProjectDetailClient({ project, publicUrl, embedCode }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-16">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: project.color }}
                        ></div>
                        <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
                    </div>
                    <p className="text-gray-600">Manage feedback and widget settings</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Public Link */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Public Feedback Page</h3>
                        <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <input
                                type="text"
                                value={publicUrl}
                                readOnly
                                className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
                            />
                            <button
                                onClick={() => navigator.clipboard.writeText(publicUrl)}
                                className="p-2 hover:bg-gray-200 rounded transition"
                                title="Copy to clipboard"
                            >
                                <Copy className="w-4 h-4 text-gray-600" />
                            </button>
                            <a
                                href={publicUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-gray-200 rounded transition"
                                title="Open in new tab"
                            >
                                <ExternalLink className="w-4 h-4 text-gray-600" />
                            </a>
                        </div>
                    </div>

                    {/* Embed Code */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Embed Widget Code</h3>
                        <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <code className="flex-1 text-xs text-gray-700 overflow-x-auto">
                                {embedCode}
                            </code>
                            <button
                                onClick={() => navigator.clipboard.writeText(embedCode)}
                                className="p-2 hover:bg-gray-200 rounded transition flex-shrink-0"
                                title="Copy to clipboard"
                            >
                                <Copy className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Feedback List */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Feedback ({project.feedbacks.length})
                        </h2>
                    </div>

                    {project.feedbacks.length === 0 ? (
                        <div className="p-12 text-center">
                            <p className="text-gray-500">No feedback yet. Share your feedback page to start collecting!</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {project.feedbacks.map((feedback) => (
                                <div key={feedback.id} className="p-6 hover:bg-gray-50 transition">
                                    <div className="flex items-start gap-4">
                                        <div className="flex flex-col items-center gap-1 flex-shrink-0">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                                                <ThumbsUp className="w-5 h-5 text-indigo-600" />
                                            </div>
                                            <span className="text-sm font-semibold text-gray-700">{feedback.upvotes}</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-900">{feedback.content}</p>
                                            <p className="text-xs text-gray-500 mt-2">
                                                {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
