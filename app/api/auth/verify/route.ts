import { NextResponse } from 'next/server';
import { adminAuth } from '@/app/lib/firebase-admin';

// List of authorized email addresses - kept secure on the server
const AUTHORIZED_EMAILS = [
  'thehomedesigncenterorlando@gmail.com',
  'codedbyleo@gmail.com',
  'leonardo.rodriguez92@gmail.com'
];

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      console.error('No ID token provided');
      return NextResponse.json({ isAuthorized: false, error: 'No ID token provided' }, { status: 400 });
    }

    try {
      const decodedToken = await adminAuth.verifyIdToken(idToken);
      const userEmail = decodedToken.email;

      const isAuthorized = userEmail && AUTHORIZED_EMAILS.includes(userEmail.toLowerCase());

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
  } catch (error) {
    console.error('Authorization error:', error);
    return NextResponse.json({ 
      isAuthorized: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 401 });
  }
} 