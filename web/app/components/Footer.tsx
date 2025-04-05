import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="/privacy" className="text-sm hover:underline">
            Privacy Policy
          </Link>
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-sm">
            &copy; {new Date().getFullYear()} UniversalBan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
