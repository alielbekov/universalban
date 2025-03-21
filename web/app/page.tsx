import Image from "next/image";
import Layout from './components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <Image
              src="/icon.svg"
              alt="UniversalBan Logo"
              width={128}
              height={128}
              priority
            />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            UniversalBan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Take control of your social media experience. Block unwanted content across multiple platforms with our powerful Chrome extension.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Multi-Platform Support */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="text-blue-600 dark:text-blue-400 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multi-Platform Support</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Works seamlessly across Reddit, Twitter/X, YouTube, Facebook, and Instagram.
            </p>
          </div>

          {/* Real-Time Filtering */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="text-blue-600 dark:text-blue-400 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-Time Filtering</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Content is filtered instantly as you scroll, with no need to refresh the page.
            </p>
          </div>

          {/* Privacy First */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="text-blue-600 dark:text-blue-400 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Privacy First</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your blocked terms are stored locally and synced securely across your devices.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <a
            href="https://chrome.google.com/webstore"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 mb-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Install UniversalBan
          </a>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Free and open source. Available on Chrome Web Store.
          </p>
        </div>

        {/* Screenshots or Demo Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            How It Works
          </h2>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg">
              {/* Placeholder for screenshot or demo video */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
