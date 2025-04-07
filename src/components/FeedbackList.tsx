import { useState, useEffect } from 'react'
import { Feedback } from '@/types/feedback'

type FeedbackListProps = {
  refreshFlag: number
}

export default function FeedbackList({ refreshFlag }: FeedbackListProps) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch('/.netlify/functions/feedbacks')
      const data = await res.json()
      setFeedbacks(data)
    } catch (err) {
      console.error('Failed to fetch feedbacks', err)
    }
  }

  useEffect(() => {
    fetchFeedbacks()
  }, [refreshFlag])

  return (
    <div className="mt-6 transition-opacity duration-300">
      <h2 className="text-xl font-bold mb-4">Submitted Feedbacks</h2>
      {feedbacks.length === 0 ? (
        <p className="text-gray-500">No feedback submitted yet.</p>
      ) : (
        <div className="grid gap-4">
          {feedbacks.map((fb) => (
            <div
              key={fb.id}
              className="bg-white dark:bg-gray-800 shadow rounded p-4 transition-transform hover:scale-105 duration-300"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{fb.name}</h3>
                <span className="text-xs text-gray-500">
                  {new Date(fb.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="mb-2">{fb.message}</p>
              <p className="text-xs text-gray-400">{fb.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
