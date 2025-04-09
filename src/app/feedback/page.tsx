import FeedbackList from '@/components/FeedbackList'
import Footer from '@/components/Footer'

export default function FeedbackPage() {


  return (
    <>
    <main className="flex flex-col justify-between min-h-[calc(100vh-84px)] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="w-full max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Submitted Feedbacks</h1>
        <FeedbackList />
      </div>
    <Footer />
    </main>
    </>
  )
}
