// src/app/api/feedbacks/route.ts

import { readFeedbacks } from '@/lib/storage'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const feedbacks = readFeedbacks()
    return NextResponse.json(feedbacks, { status: 200 })
  } catch (err) {
    console.error('Error reading feedbacks:', err)
    return NextResponse.json({ error: 'Failed to load feedbacks' }, { status: 500 })
  }
}
