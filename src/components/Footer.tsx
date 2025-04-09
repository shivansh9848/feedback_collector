import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-4 w-full bg-gray-200 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 py-4">
      <div className="container mx-auto px-4 text-center text-sm text-gray-800 dark:text-gray-100">
        &copy; {new Date().getFullYear()} Shivansh Rai - Internship Submission
      </div>
    </footer>
  )
}

export default Footer
