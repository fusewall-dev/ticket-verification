"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem('session');
    if (!session || session !== 'active') {
      router.push('/login');
    }
  }, [router]);

  return children;
};

export default ProtectedRoute;
