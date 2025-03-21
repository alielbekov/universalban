import Layout from '../components/Layout';

const faqs = [
  {
    question: "What is UniversalBan?",
    answer: "UniversalBan is a Chrome extension that allows you to filter out unwanted content from your social media feeds. You can block specific terms, celebrities, or topics across multiple platforms including Reddit, Twitter/X, YouTube, Facebook, and Instagram."
  },
  {
    question: "How does it work?",
    answer: "The extension scans your social media feeds in real-time and removes any posts or content that contain your blocked terms. It uses smart pattern matching to ensure comprehensive filtering while maintaining performance."
  },
  {
    question: "Is my data private?",
    answer: "Yes, absolutely! Your blocked terms are stored locally in your browser using Chrome's secure storage API. We don't collect, store, or transmit any of your personal data or browsing history."
  },
  {
    question: "Which platforms are supported?",
    answer: "UniversalBan currently supports Reddit, Twitter/X, YouTube, Facebook, and Instagram. We're constantly working on adding support for more platforms."
  },
  {
    question: "Do I need to refresh the page for changes to take effect?",
    answer: "No! UniversalBan works in real-time. When you add or remove terms from your block list, the changes take effect immediately without requiring a page refresh."
  },
  {
    question: "Can I sync my settings across devices?",
    answer: "Yes, if you're signed into Chrome, your blocked terms will automatically sync across all your devices where you've installed UniversalBan."
  },
  {
    question: "Is UniversalBan free?",
    answer: "Yes, UniversalBan is completely free to use. We believe in making the internet a better place for everyone."
  },
  {
    question: "How can I report a bug or suggest a feature?",
    answer: "You can report bugs or suggest features through our GitHub repository or by contacting us directly through our contact form. We appreciate your feedback and are constantly working to improve the extension."
  }
];

export default function FAQ() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about UniversalBan
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <dl className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-8">
                <dt className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {faq.question}
                </dt>
                <dd className="text-base text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Still have questions?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Contact Us
          </a>
        </div>
      </div>
    </Layout>
  );
}
