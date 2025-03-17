"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginPage.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if there's an active session and redirect to /dashboard
    if (localStorage.getItem('session') === 'active') {
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Assuming you have USERNAME and PASSWORD in your env.local
    const correctUsername = process.env.NEXT_PUBLIC_USERNAME;
    const correctPassword = process.env.NEXT_PUBLIC_PASSWORD;

    if (username === correctUsername && password === correctPassword) {
      // Store session in localStorage
      localStorage.setItem('session', 'active');
      // Redirect to dashboard
      router.push('/dashboard');
    } else {
      // Toast error message
      toast.error('Invalid username or password', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className={styles.formContainer}>
      <ToastContainer/>
      <video autoPlay loop muted playsInline className={styles.videoBackground}>
        <source src="/videos/background1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <header className={`${styles.header} text-center`}>
        <div className='flex flex-row items-center justify-center space-x-4'>
        <img src="/logo.png" alt="Logo" className="w-15" /> 
        <h1 className="text-2xl font-bold">TICKET VERIFICATION APP</h1>
        </div>
      </header>
      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
      <footer className={`${styles.footer} text-center `}>
        <p>©2025 All rights Reserved. Version 1.0</p>
      </footer>
    </div>
  );
};

export default LoginPage;
