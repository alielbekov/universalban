import React from 'react';
import Link from 'next/link';
import GoogleAnalytics from './GoogleAnalytics';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <GoogleAnalytics />
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            Universal Ban
          </Link>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
