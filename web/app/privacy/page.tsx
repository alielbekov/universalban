import Layout from '../components/Layout';

export default function Privacy() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Privacy Policy
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Introduction
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                UniversalBan (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our Chrome extension.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Information We Collect
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                UniversalBan is designed with privacy in mind. We collect minimal information:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Your blocked terms and preferences (stored locally in your browser)</li>
                <li>Basic usage statistics (anonymous and aggregated)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                How We Use Your Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The information we collect is used solely for:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Providing and improving the extension's functionality</li>
                <li>Syncing your preferences across devices (when enabled)</li>
                <li>Understanding how users interact with the extension</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Data Storage and Security
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Your blocked terms and preferences are stored locally in your browser using Chrome&apos;s secure storage API. If you enable Chrome sync, this data will be encrypted and synced across your devices. We do not store any personal information on our servers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Third-Party Services
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                UniversalBan operates entirely within your browser and does not share data with third-party services. The extension interacts only with the social media platforms you visit to apply your content filtering preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Your Rights
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                You have complete control over your data. You can view, modify, or delete your blocked terms at any time through the extension&apos;s interface. You can also uninstall the extension to remove all stored data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Changes to This Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                If you have any questions about this Privacy Policy, please contact us through our{' '}
                <a href="/contact" className="text-blue-600 hover:text-blue-500">
                  contact form
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
