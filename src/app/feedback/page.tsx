'use client'
import FeedbackList from '@/components/FeedbackList'

export default function FeedbackPage() {
//   const [refreshFlag, setRefreshFlag] = useState(0)

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6 text-center">Submitted Feedback</h1>
      <div className="w-full max-w-3xl mx-auto">
        <FeedbackList />
      </div>
    </main>
  )
}
