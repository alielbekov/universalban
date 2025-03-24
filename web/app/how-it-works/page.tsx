import Layout from '../components/Layout';

export default function HowItWorks() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            How Universal Ban Works
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Take control of your social media experience with our powerful content filtering system
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Install & Configure
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Install Universal Ban from the Chrome Web Store and click on the extension icon to open the settings panel. You can start adding terms, celebrities, or topics you want to block from your feeds.
              </p>
            </div>
            <div className="flex-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-6">
              {/* Placeholder for installation screenshot */}
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Smart Content Filtering
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Our extension automatically scans your social media feeds in real-time and removes any content matching your blocked terms. The filtering works across multiple platforms including Reddit, Twitter/X, YouTube, Facebook, and Instagram.
              </p>
            </div>
            <div className="flex-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-6">
              {/* Placeholder for filtering screenshot */}
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. Enjoy Your Curated Feed
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Browse your favorite social media platforms without seeing unwanted content. Your preferences are synced across devices, and changes take effect immediately without requiring page refreshes.
              </p>
            </div>
            <div className="flex-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-6">
              {/* Placeholder for result screenshot */}
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://chrome.google.com/webstore"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            Install Universal Ban Now
          </a>
        </div>
      </div>
    </Layout>
  );
}
