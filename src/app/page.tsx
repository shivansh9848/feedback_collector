// page.tsx
'use client'

import FeedbackForm from '@/components/FeedbackForm';

export default function Home() {
//   const [showFeedbacks, setShowFeedbacks] = useState(false);
//   const [refreshFlag, setRefreshFlag] = useState(0);

//   const handleFeedbackSubmitted = () => {
//     // Trigger a refresh for FeedbackList
//     setRefreshFlag((prev) => prev + 1);
//   };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 flex flex-col items-center transition-colors duration-300">
      <div className="w-full max-w-2xl">
        {/* <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">HeyFeedback</h1>
        </div> */}
        <FeedbackForm  />
     
      </div>
      <footer className="mt-auto text-xs text-gray-400 transition-colors duration-300">
        &copy; {new Date().getFullYear()} Your Name - Internship Submission
      </footer>
    </main>
  );
}
