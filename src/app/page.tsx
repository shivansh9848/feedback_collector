'use client'
import { useState, useEffect } from 'react'
import FeedbackForm from '@/components/FeedbackForm'
import FeedbackList from '@/components/FeedbackList'

export default function Home() {
  const [showFeedbacks, setShowFeedbacks] = useState(false)
  const [refreshFlag, setRefreshFlag] = useState(0)
  const [isDark, setIsDark] = useState(false)

  const handleFeedbackSubmitted = () => {
    // Trigger a refresh for FeedbackList
    setRefreshFlag((prev) => prev + 1)
  }

  // Apply theme class to <html> element for Tailwind dark mode support.
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 flex flex-col items-center transition-colors duration-300">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">HeyFeedback</h1>
          <button
            onClick={() => setIsDark(!isDark)}
            className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-1 px-3 rounded transition-colors duration-300"
          >
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        <FeedbackForm onFeedbackSubmitted={handleFeedbackSubmitted} />
        <button
          onClick={() => setShowFeedbacks(!showFeedbacks)}
          className="mt-4 w-full sm:w-auto bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
        >
          {showFeedbacks ? 'Hide Submitted Feedback' : 'View Submitted Feedback'}
        </button>
        {showFeedbacks && <FeedbackList refreshFlag={refreshFlag} />}
      </div>
      <footer className="mt-auto text-xs text-gray-400 transition-colors duration-300">
        &copy; {new Date().getFullYear()} Your Name - Internship Submission
      </footer>
    </main>
  )
}
