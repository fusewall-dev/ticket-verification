// src/app/page.js
"use client";
import '../app/globals.css';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('session') === 'active';
    if (isAuthenticated) {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/login';
    }
  }, []);

  return null; // No need to render anything here as we're redirecting
}
