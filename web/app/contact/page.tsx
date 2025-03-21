import Layout from '../components/Layout';

export default function Contact() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have questions or feedback? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="mt-12 max-w-xl mx-auto">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md"
                  placeholder="Your name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Subject
              </label>
              <div className="mt-1">
                <select
                  id="subject"
                  name="subject"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md"
                >
                  <option>General Question</option>
                  <option>Bug Report</option>
                  <option>Feature Request</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <div className="mt-1">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md"
                  placeholder="Your message..."
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Send Message
              </button>
            </div>
          </form>

          <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">GitHub</h3>
                <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                  For bug reports and feature requests, visit our GitHub repository.
                </p>
                <a
                  href="https://github.com/alielbekov/universalban"
                  className="mt-3 text-blue-600 hover:text-blue-500 inline-flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub →
                </a>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Chrome Web Store</h3>
                <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                  Leave a review or get support through the Chrome Web Store.
                </p>
                <a
                  href="https://chrome.google.com/webstore"
                  className="mt-3 text-blue-600 hover:text-blue-500 inline-flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Extension →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
