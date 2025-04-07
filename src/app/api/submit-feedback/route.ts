// src/app/api/submit-feedback/route.ts

import { writeFeedback } from '@/lib/storage'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const { name, email, message } = body

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
  }

  try {
    const newFeedback = writeFeedback({ name, email, message })
    return NextResponse.json(newFeedback, { status: 200 })
  } catch (err) {
    console.error('Error writing feedback:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
