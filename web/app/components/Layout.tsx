import React from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            UniversalBan
          </Link>
          <div className="flex space-x-8">
            <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              How it Works
            </Link>
            <Link href="/faq" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              FAQ
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Contact
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Legal</h3>
              <div className="mt-4 space-y-4">
                <Link href="/privacy" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white block">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white block">
                  Terms of Use
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Support</h3>
              <div className="mt-4 space-y-4">
                <Link href="/faq" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white block">
                  FAQ
                </Link>
                <Link href="/contact" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white block">
                  Contact Us
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Connect</h3>
              <div className="mt-4 space-y-4">
                <a href="https://github.com/alielbekov/universalban" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white block">
                  GitHub
                </a>
                <a href="https://chrome.google.com/webstore" className="text-base text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white block">
                  Chrome Web Store
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
            <p className="text-base text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} UniversalBan. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
