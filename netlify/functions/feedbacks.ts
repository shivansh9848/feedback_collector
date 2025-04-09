import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'
import fs from 'fs'
import path from 'path'

const filePath = path.join('/tmp', 'feedbacks.json')

// Helper to ensure the file exists; if not, create it as an empty array.
const ensureDataFileExists = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]')
  }
}

// Read current feedbacks from the file.
const readFeedbacks = (): any[] => {
  ensureDataFileExists()
  const data = fs.readFileSync(filePath, 'utf-8').trim()
  return data ? JSON.parse(data) : []
}

// Write feedbacks array back to the file.
const writeFeedbacks = (feedbacks: any[]) => {
  fs.writeFileSync(filePath, JSON.stringify(feedbacks, null, 2))
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  try {
    if (event.httpMethod === 'GET') {
      // For GET requests, return all feedbacks.
      const feedbacks = readFeedbacks()
      return {
        statusCode: 200,
        body: JSON.stringify(feedbacks),
      }
    } else if (event.httpMethod === 'POST') {
      // For POST requests, add a new feedback.
      const body = JSON.parse(event.body || '{}')
      const { name, email, message } = body
      
      if (!name || !email || !message) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'All fields are required' }),
        }
      }
      
      const feedbacks = readFeedbacks()
      
      const newFeedback = {
        id: feedbacks.length + 1, // Simple auto-incrementing ID.
        name,
        email,
        message,
        timestamp: new Date().toISOString()
      }
      
      feedbacks.push(newFeedback)
      writeFeedbacks(feedbacks)
      
      return {
        statusCode: 200,
        body: JSON.stringify(newFeedback),
      }
    } else {
      // For any other method, return 405 Method Not Allowed.
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
      }
    }
  } catch (error) {
    console.error('Error processing request:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' })
    }
  }
}
