import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'
import fs from 'fs'
import path from 'path'

// The writable directory on Netlify Functions is /tmp
const filePath = path.join('/tmp', 'feedbacks.json')

// Ensure the file exists (if not, create an empty JSON array)
const ensureDataFileExists = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]')
  }
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    }
  }
  
  try {
    const body = JSON.parse(event.body || '{}')
    const { name, email, message } = body

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'All fields are required' })
      }
    }

    ensureDataFileExists()
    let feedbacks = []
    try {
      const data = fs.readFileSync(filePath, 'utf-8').trim()
      // If file is empty, default to an empty array
      feedbacks = data ? JSON.parse(data) : []
    } catch (error) {
      feedbacks = []
    }
    
    const newFeedback = {
      id: feedbacks.length + 1,
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    }
    
    feedbacks.push(newFeedback)
    fs.writeFileSync(filePath, JSON.stringify(feedbacks, null, 2))
    
    return {
      statusCode: 200,
      body: JSON.stringify(newFeedback)
    }
  } catch (error) {
    console.error('Error writing feedback:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' })
    }
  }
}
