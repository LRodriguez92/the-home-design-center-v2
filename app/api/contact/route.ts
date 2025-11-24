import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { honeypot, captchaToken } = body

    // Validate captcha token is present
    if (!captchaToken) {
      console.log('No captcha token provided')
      return NextResponse.json({ 
        success: false, 
        error: 'Captcha verification required' 
      }, { status: 400 })
    }

    // Verify hCaptcha token with hCaptcha API
    const hcaptchaSecret = process.env.HCAPTCHA_SECRET_KEY
    if (!hcaptchaSecret) {
      console.error('HCAPTCHA_SECRET_KEY is not set in environment variables')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    try {
      const verifyResponse = await fetch('https://hcaptcha.com/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: hcaptchaSecret,
          response: captchaToken,
        }),
      })

      const verifyResult = await verifyResponse.json()

      if (!verifyResult.success) {
        console.log('Captcha verification failed:', verifyResult['error-codes'])
        // Silently reject - don't let bots know they were caught
        return NextResponse.json({ success: true }, { status: 200 })
      }
    } catch (captchaError) {
      console.error('Captcha verification error:', captchaError)
      return NextResponse.json(
        { error: 'Captcha verification failed' },
        { status: 500 }
      )
    }

    // Honeypot check - if this field is filled, it's a bot
    if (honeypot && honeypot.trim() !== '') {
      // Silently reject - don't let bots know they were caught
      console.log('Bot detected via honeypot')
      return NextResponse.json({ success: true }, { status: 200 })
    }

    // Both captcha and honeypot passed - return success and let client call Web3Forms directly
    console.log('Captcha and honeypot validation passed - allowing submission')
    return NextResponse.json({ 
      success: true, 
      proceed: true,
      message: 'Validation passed' 
    })
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

