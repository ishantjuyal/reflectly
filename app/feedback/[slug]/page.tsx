'use client'

import { useState, useEffect } from 'react'
import { ThumbsUp, Send, Loader2 } from 'lucide-react'

interface Feedback {
    id: string
    content: string
    upvotes: number
    createdAt: string
}

interface Project {
    id: string
    name: string
    color: string
}

export default function FeedbackPage({ params }: { params: Promise<{ slug: string }> }) {
    const [project, setProject] = useState<Project | null>(null)
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
    const [newFeedback, setNewFeedback] = useState('')
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [upvotedIds, setUpvotedIds] = useState<Set<string>>(new Set())
    const [slug, setSlug] = useState<string>('')

    useEffect(() => {
        params.then(p => setSlug(p.slug))
    }, [params])

    useEffect(() => {
        if (!slug) return
        fetchData()
        // Load upvoted IDs from localStorage
        const stored = localStorage.getItem(`upvoted_${slug}`)
        if (stored) {
            setUpvotedIds(new Set(JSON.parse(stored)))
        }
    }, [slug])

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/feedback/${slug}`)
            if (!response.ok) throw new Error('Project not found')

            const data = await response.json()
            setProject(data.project)
            setFeedbacks(data.feedbacks)
        } catch (error) {
            setError('Failed to load feedback')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newFeedback.trim()) return

        setSubmitting(true)
        setError('')

        try {
            const response = await fetch(`/api/feedback/${slug}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newFeedback }),
            })

            if (!response.ok) throw new Error('Failed to submit feedback')

            setNewFeedback('')
            await fetchData()
        } catch (error) {
            setError('Failed to submit feedback')
        } finally {
            setSubmitting(false)
        }
    }

    const handleUpvote = async (feedbackId: string) => {
        if (upvotedIds.has(feedbackId)) return

        try {
            const response = await fetch(`/api/feedback/${slug}/upvote`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ feedbackId }),
            })

            if (!response.ok) throw new Error('Failed to upvote')

            const newUpvotedIds = new Set(upvotedIds).add(feedbackId)
            setUpvotedIds(newUpvotedIds)
            localStorage.setItem(`upvoted_${slug}`, JSON.stringify([...newUpvotedIds]))

            await fetchData()
        } catch (error) {
            console.error('Upvote failed:', error)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        )
    }

    if (error && !project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h1>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div
                            className="w-6 h-6 rounded-full shadow-lg"
                            style={{ backgroundColor: project?.color }}
                        ></div>
                        <h1 className="text-4xl font-bold text-gray-900">{project?.name}</h1>
                    </div>
                    <p className="text-gray-600 text-lg">Share your feedback and help us improve!</p>
                </div>

                {/* Feedback Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Submit Feedback</h2>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <textarea
                            value={newFeedback}
                            onChange={(e) => setNewFeedback(e.target.value)}
                            placeholder="What would you like to see improved?"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                            rows={4}
                            required
                        />
                        <button
                            type="submit"
                            disabled={submitting || !newFeedback.trim()}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Submit Feedback
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Feedback List */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
                        <h2 className="text-xl font-semibold text-gray-900">
                            All Feedback ({feedbacks.length})
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">Upvote feedback you agree with</p>
                    </div>

                    {feedbacks.length === 0 ? (
                        <div className="p-12 text-center">
                            <p className="text-gray-500">No feedback yet. Be the first to share your thoughts!</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {feedbacks.map((feedback) => {
                                const hasUpvoted = upvotedIds.has(feedback.id)
                                return (
                                    <div key={feedback.id} className="p-6 hover:bg-gray-50 transition">
                                        <div className="flex items-start gap-4">
                                            <button
                                                onClick={() => handleUpvote(feedback.id)}
                                                disabled={hasUpvoted}
                                                className={`flex flex-col items-center gap-1 flex-shrink-0 p-3 rounded-lg transition ${hasUpvoted
                                                    ? 'bg-gradient-to-br from-indigo-100 to-purple-100 cursor-not-allowed'
                                                    : 'bg-gray-100 hover:bg-gradient-to-br hover:from-indigo-100 hover:to-purple-100 hover:scale-105'
                                                    }`}
                                            >
                                                <ThumbsUp
                                                    className={`w-5 h-5 ${hasUpvoted ? 'text-indigo-600 fill-indigo-600' : 'text-gray-600'}`}
                                                />
                                                <span className={`text-sm font-semibold ${hasUpvoted ? 'text-indigo-600' : 'text-gray-700'}`}>
                                                    {feedback.upvotes}
                                                </span>
                                            </button>
                                            <div className="flex-1">
                                                <p className="text-gray-900 text-lg">{feedback.content}</p>
                                                <p className="text-xs text-gray-500 mt-2">
                                                    {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-sm text-gray-500">
                        Powered by{' '}
                        <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Reflectly
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}
