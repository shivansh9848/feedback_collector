'use client'
import { useState } from 'react'
import FeedbackForm from '@/components/FeedbackForm'
import FeedbackList from '@/components/FeedbackList'

export default function Home() {
  const [showFeedbacks, setShowFeedbacks] = useState(false)
  const [refreshFlag, setRefreshFlag] = useState(0)

  const handleFeedbackSubmitted = () => {
    // Trigger a refresh for FeedbackList
    setRefreshFlag((prev) => prev + 1)
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Feedback Collector</h1>
        <FeedbackForm onFeedbackSubmitted={handleFeedbackSubmitted} />
        <button
          onClick={() => setShowFeedbacks(!showFeedbacks)}
          className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          {showFeedbacks ? 'Hide Submitted Feedback' : 'View Submitted Feedback'}
        </button>
        {showFeedbacks && <FeedbackList refreshFlag={refreshFlag} />}
      </div>
      <footer className="mt-auto text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Your Name - Internship Submission
      </footer>
    </main>
  )
}
