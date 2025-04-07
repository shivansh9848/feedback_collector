import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'
import fs from 'fs'
import path from 'path'

const filePath = path.join('/tmp', 'feedbacks.json')

const ensureDataFileExists = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]')
  }
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    }
  }
  
  try {
    ensureDataFileExists()
    const data = fs.readFileSync(filePath, 'utf-8').trim()
    const feedbacks = data ? JSON.parse(data) : []
    return {
      statusCode: 200,
      body: JSON.stringify(feedbacks)
    }
  } catch (error) {
    console.error('Error reading feedbacks:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to load feedbacks' })
    }
  }
}
