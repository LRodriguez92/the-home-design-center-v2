'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signInWithGoogle: async () => {},
  logOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  // Helper function to verify authorization with the server
  const verifyAuthorization = async (user: User) => {
    try {
      const idToken = await user.getIdToken();
      
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('Server authorization failed:', data.error);
        throw new Error(data.error || 'Unauthorized email address');
      }

      // Set session cookie if authorized
      if (data.isAuthorized) {
        document.cookie = `session=${idToken}; path=/; max-age=3600; secure; samesite=strict`;
      }

      return data.isAuthorized;
    } catch (error) {
      console.error('Authorization verification error:', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const isAuthorized = await verifyAuthorization(user);
          if (!isAuthorized) {
            document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            await signOut(auth);
            setUser(null);
          } else {
            setUser(user);
          }
        } catch (error) {
          console.error('Auth state change error:', error);
          document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          await signOut(auth);
          setUser(null);
        }
      } else {
        document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const isAuthorized = await verifyAuthorization(result.user);
      if (!isAuthorized) {
        document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        await signOut(auth);
        throw new Error('Unauthorized email address');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const isAuthorized = await verifyAuthorization(result.user);
      if (!isAuthorized) {
        document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        await signOut(auth);
        throw new Error('Unauthorized email address');
      }
    } catch (error) {
      console.error('Google authentication error:', error);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signInWithGoogle, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 