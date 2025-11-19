import Link from 'next/link'
import { ArrowRight, MessageSquare, TrendingUp, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Reflectly
            </h1>
            <div className="flex items-center gap-4">
              <Link
                href="/auth/signin"
                className="text-gray-700 hover:text-gray-900 font-medium transition"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl"
              >
                Start for Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Collect Feedback That{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Actually Matters
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Let your users share feedback, vote on features, and help you build better products.
            Simple, beautiful, and powerful.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-xl hover:shadow-2xl"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/auth/signin"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-300 hover:border-indigo-600 transition shadow-lg hover:shadow-xl"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mb-6">
              <MessageSquare className="w-7 h-7 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Easy Collection</h3>
            <p className="text-gray-600 leading-relaxed">
              Embed a beautiful feedback widget on your site in seconds. No complex setup required.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mb-6">
              <TrendingUp className="w-7 h-7 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Upvote System</h3>
            <p className="text-gray-600 leading-relaxed">
              Let users vote on feedback they agree with. Prioritize what matters most to your community.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mb-6">
              <Zap className="w-7 h-7 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Actionable Insights</h3>
            <p className="text-gray-600 leading-relaxed">
              View all feedback in one dashboard. Make data-driven decisions to improve your product.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Build Better Products?
          </h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
            Join product owners who are already collecting valuable feedback from their users.
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition shadow-xl hover:shadow-2xl"
          >
            Start for Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">
            © 2024 Reflectly. Built with ❤️ for product owners.
          </p>
        </div>
      </footer>
    </div>
  )
}
