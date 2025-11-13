import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { honeypot } = body

    // Debug logging
    console.log('Honeypot value received:', honeypot)
    console.log('Honeypot type:', typeof honeypot)
    console.log('Honeypot truthy check:', !!honeypot)
    console.log('Honeypot trim check:', honeypot?.trim())

    // Honeypot check - if this field is filled, it's a bot
    if (honeypot && honeypot.trim() !== '') {
      // Silently reject - don't let bots know they were caught
      console.log('Bot detected via honeypot')
      return NextResponse.json({ success: true }, { status: 200 })
    }

    // Honeypot passed - return success and let client call Web3Forms directly
    console.log('Honeypot validation passed - allowing submission')
    return NextResponse.json({ 
      success: true, 
      proceed: true,
      message: 'Honeypot validation passed' 
    })
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

