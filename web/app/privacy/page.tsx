import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-lg">
        <p className="text-sm mb-8">Last Updated: April 5, 2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p>
            UniversalBan is a browser extension designed to enhance your social media experience by filtering unwanted content. 
            We prioritize your privacy and data security above all else.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Collection and Storage</h2>
          <p className="mb-4">Our extension operates with a strict privacy-first approach:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Zero Data Collection: We do not collect, store, or transmit any personal information</li>
            <li>Local Storage: All blocked terms and preferences are stored exclusively in your browser using Chrome&apos;s secure storage sync feature</li>
            <li>Browser Sync: Your settings only sync between your own Chrome browsers when you&apos;re signed into Chrome</li>
            <li>No Tracking: We do not monitor your browsing history or behavior</li>
            <li>Local Processing: All content filtering happens directly on your device</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How the Extension Works</h2>
          <p className="mb-4">UniversalBan operates entirely locally:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Scans content on supported social media platforms (Reddit, Twitter, YouTube, Facebook, Instagram)</li>
            <li>Filters content based on your specified blocked terms</li>
            <li>Processes everything locally on your device</li>
            <li>Uses Chrome&apos;s storage sync for saving preferences</li>
            <li>Never transmits your blocked terms or preferences to any external servers</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Required Permissions</h2>
          <p className="mb-4">The extension requires minimal permissions to function:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access to specific social media sites for content filtering</li>
            <li>Storage permission for saving your preferences locally</li>
            <li>No access to browsing history</li>
            <li>No access to personal data</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All operations are performed locally on your device</li>
            <li>No external server communication</li>
            <li>Your preferences are stored securely in Chrome&apos;s built-in storage</li>
            <li>No collection or transmission of personal data</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Updates to Privacy Policy</h2>
          <p>
            We may update this privacy policy as needed. Any changes will be reflected on this page 
            with an updated &quot;Last Updated&quot; date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p>
            For questions about this privacy policy or our privacy practices, please contact us through 
            the Chrome Web Store support channel or create an issue on our GitHub repository.
          </p>
        </section>
      </div>
    </div>
  );
}
