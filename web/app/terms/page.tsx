import Layout from '../components/Layout';

export default function Terms() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Terms of Use
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Acceptance of Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                By using UniversalBan, you agree to comply with these terms. If you do not agree with any part of these terms, you must not use the extension. Our services are provided &quot;as is&quot; without any warranties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Description of Service
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                UniversalBan is a Chrome extension that allows users to filter content from various social media platforms. The extension operates by scanning webpage content and hiding elements that match user-defined criteria.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                User Responsibilities
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                As a user of UniversalBan, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Use the extension in compliance with all applicable laws and regulations</li>
                <li>Not attempt to modify, reverse engineer, or tamper with the extension</li>
                <li>Not use the extension to harm, harass, or discriminate against others</li>
                <li>Report any bugs or security vulnerabilities you discover</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Intellectual Property
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                UniversalBan and all related content, features, and functionality are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Disclaimer of Warranties
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                UniversalBan is provided &quot;as is&quot; without any warranties, expressed or implied. We do not guarantee that the extension will be error-free or uninterrupted, or that any defects will be corrected.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Limitation of Liability
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                In no event shall UniversalBan be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the extension.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Changes to Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We reserve the right to update or modify these Terms of Use at any time without prior notice. Your continued use of UniversalBan after any such changes constitutes your acceptance of the new Terms of Use. Please check this page regularly for updates.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Third-Party Services
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                UniversalBan interacts with third-party social media platforms but is not affiliated with or endorsed by these platforms. Your use of these platforms is governed by their respective terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Contact
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                If you have any questions about these Terms of Use, please contact us through our{' '}
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
