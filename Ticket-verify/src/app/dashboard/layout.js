// src/app/dashboard/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dashboard - Showtime Ticket Verification",
  description: "Showtime Ticket Verification Dashboard",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header className="fixed top-0 w-full bg-white shadow-md z-50 p-4 flex justify-between items-center ">
          <div className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-gray-300 to-blue-600">
          <div className='flex flex-row items-center space-x-4'>
          <img src="/logo.png" alt="Logo" className="w-10 md:w-15" /> 
            <h1>Ticket Verification Portal</h1>
            </div>
          </div>
        </header>
        <main className="pt-16 pb-10 bg-gray-100 min-h-screen">
          {children}
        </main>
        <footer className="fixed bottom-0 w-full bg-white shadow-md z-50 p-4 text-center">
          © 2025 All rights reserved. <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-gray-300 to-blue-600">Version 1.0.0</span>
        </footer>
      </body>
    </html>
  );
}
