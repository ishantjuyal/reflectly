'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewProject() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [slug, setSlug] = useState('')
    const [color, setColor] = useState('#6366f1')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleNameChange = (value: string) => {
        setName(value)
        // Auto-generate slug from name
        const generatedSlug = value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
        setSlug(generatedSlug)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    slug,
                    color,
                }),
            })

            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(errorText)
            }

            const project = await response.json()
            router.push(`/dashboard/${project.id}`)
            router.refresh()
        } catch (error: any) {
            setError(error.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const colorPresets = [
        '#6366f1', // Indigo
        '#8b5cf6', // Purple
        '#ec4899', // Pink
        '#f59e0b', // Amber
        '#10b981', // Emerald
        '#3b82f6', // Blue
        '#ef4444', // Red
        '#06b6d4', // Cyan
    ]

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

            <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Project</h1>
                    <p className="text-gray-600 mb-8">Set up a new feedback widget for your product</p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Project Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => handleNameChange(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                                placeholder="My Awesome Product"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                                Unique Slug
                            </label>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-500 text-sm">reflectly.com/</span>
                                <input
                                    id="slug"
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                                    placeholder="my-awesome-product"
                                    pattern="[a-z0-9-]+"
                                    required
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Only lowercase letters, numbers, and hyphens</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Brand Color
                            </label>
                            <div className="flex items-center gap-4 mb-3">
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-300"
                                />
                                <div>
                                    <p className="text-sm text-gray-600">Selected color</p>
                                    <p className="text-xs font-mono text-gray-500">{color}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {colorPresets.map((preset) => (
                                    <button
                                        key={preset}
                                        type="button"
                                        onClick={() => setColor(preset)}
                                        className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:scale-110 transition"
                                        style={{ backgroundColor: preset }}
                                        title={preset}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                            >
                                {loading ? 'Creating...' : 'Create Project'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}
