import fs from 'fs'
import path from 'path'
import { Feedback } from '@/types/feedback'

const dataDir = path.join(process.cwd(), 'src', 'data')
const filePath = path.join(dataDir, 'feedbacks.json')

export const ensureDataFileExists = () => {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir)
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, '[]')
}

export const readFeedbacks = (): Feedback[] => {
  ensureDataFileExists()
  let data = fs.readFileSync(filePath, 'utf-8').trim()

  // If the file is empty, default to an empty array.
  if (!data) {
    data = '[]'
  }

  try {
    return JSON.parse(data)
  } catch (error) {
    console.error('Error parsing JSON:', error)
    return []
  }
}

export const writeFeedback = (feedback: Omit<Feedback, 'id' | 'timestamp'>): Feedback => {
  const feedbacks = readFeedbacks()
  const newFeedback: Feedback = {
    id: feedbacks.length + 1,
    timestamp: new Date().toISOString(),
    ...feedback,
  }
  feedbacks.push(newFeedback)
  fs.writeFileSync(filePath, JSON.stringify(feedbacks, null, 2))
  return newFeedback
}
