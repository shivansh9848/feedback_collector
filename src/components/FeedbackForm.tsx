'use client'
import { useState, FormEvent } from 'react'
export default function FeedbackForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('All fields are required. Please fill in the missing details.')
      setSuccess('')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.')
      setSuccess('')
      return
    }

    setError('')
    setLoading(true)

    try {
      const res = await fetch('/.netlify/functions/feedbacks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      })

      if (res.ok) {
        setSuccess('Feedback submitted successfully!')
        setName('')
        setEmail('')
        setMessage('')
        
      } else {
        setError('Submission failed. Please try again.')
      }
    } catch{
      setError('Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow rounded p-6 transition-colors duration-300">
      <h2 className="text-xl font-bold mb-4">Submit Your Feedback</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1 font-medium">Full Name</label>
        <input
          id="name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-1 font-medium">Email</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block mb-1 font-medium">Feedback Message</label>
        <textarea
          id="message"
          placeholder="Your feedback"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          rows={4}
        ></textarea>
      </div>
      {error && <p className="text-red-500 mb-2 transition-opacity duration-300">{error}</p>}
      {success && <p className="text-green-500 mb-2 transition-opacity duration-300">{success}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
      >
        {loading ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </form>
  )
}
