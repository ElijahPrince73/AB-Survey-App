import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';

const RootLayoutNav = () => {
  const { jwt } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (jwt === undefined) {
      // Still loading token, don't do anything
      return;
    }

    // If we are not logged in and on a protected route auto redirect to login
    if (jwt === null && segments[0] !== '(auth)') {
      router.replace('/login');
    }

    // If we have a jwt and are on a login or register screen redirect to survey screen
    if (jwt && segments[0] !== '(protected)') {
      router.replace('/survey');
    }
  }, [jwt, segments])

  return (
    <Stack screenOptions={{ headerShown: false }} />
  )
}


export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
