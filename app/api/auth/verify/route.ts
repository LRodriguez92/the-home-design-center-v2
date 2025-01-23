import { NextResponse } from 'next/server';
import { adminAuth } from '@/app/lib/firebase-admin';

// List of authorized email addresses - kept secure on the server
const AUTHORIZED_EMAILS = [
  'hdckitchenandbath@gmail.com',
  'codedbyleo@gmail.com'
];

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      console.error('No ID token provided');
      return NextResponse.json({ isAuthorized: false, error: 'No ID token provided' }, { status: 400 });
    }

    console.log('Verifying token...');
    // Verify the ID token
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const userEmail = decodedToken.email;
    console.log('Token verified for email:', userEmail);

    // Check if the email is authorized
    const isAuthorized = userEmail && AUTHORIZED_EMAILS.includes(userEmail.toLowerCase());
    console.log('Authorization check:', { userEmail, isAuthorized });

    if (!isAuthorized) {
      console.error('Unauthorized email:', userEmail);
      return NextResponse.json({ 
        isAuthorized: false, 
        error: 'Email not authorized'
      }, { status: 403 });
    }

    return NextResponse.json({ isAuthorized: true });
  } catch (error) {
    console.error('Authorization error:', error);
    return NextResponse.json({ 
      isAuthorized: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 401 });
  }
} 