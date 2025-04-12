import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            Privacy Policy
          </Link>
          <span className="text-gray-400">•</span>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} UniversalBan
          </p>
        </div>
      </div>
    </footer>
  );
}
