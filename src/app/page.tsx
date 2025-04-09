
import FeedbackForm from '@/components/FeedbackForm';
import Footer from '@/components/Footer';

export default function Home () {
 
  return (
    <div className="flex flex-col min-h-[calc(100vh-84px)] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="flex-grow overflow-auto flex flex-col items-center justify-start">
        <div className="w-full max-w-2xl p-6">
          <FeedbackForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
