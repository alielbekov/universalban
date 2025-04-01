import Image from "next/image";
import Layout from './components/Layout';
import { FaReddit, FaTwitter, FaFacebook, FaYoutube, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaGlobe } from 'react-icons/fa';
import { MdAccessTime } from 'react-icons/md';
import { IoShieldCheckmark } from 'react-icons/io5';

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
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Manage All Your Feeds
          </h1>
          <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-6">
            From One Place
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Take control of your social media experience. Block unwanted content across multiple platforms with our powerful Chrome extension.
          </p>
          
          {/* Social Media Icons */}
          <div className="flex justify-center gap-6 mb-8">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[#0077b5]/20 dark:hover:bg-[#0077b5]/40 transition-colors">
              <FaLinkedin className="w-6 h-6 text-[#0077b5]" />
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[#FF4500]/20 dark:hover:bg-[#FF4500]/40 transition-colors">
              <FaReddit className="w-6 h-6 text-[#FF4500]" />
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[#1DA1F2]/20 dark:hover:bg-[#1DA1F2]/40 transition-colors">
              <FaTwitter className="w-6 h-6 text-[#1DA1F2]" />
            </div>

            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[#FF0000]/20 dark:hover:bg-[#FF0000]/40 transition-colors">
              <FaYoutube className="w-6 h-6 text-[#FF0000]" />
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[#1877F2]/20 dark:hover:bg-[#1877F2]/40 transition-colors">
              <FaFacebook className="w-6 h-6 text-[#1877F2]" />
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[#E4405F]/20 dark:hover:bg-[#E4405F]/40 transition-colors">
              <FaInstagram className="w-6 h-6 text-[#E4405F]" />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Multi-Platform Support */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="text-blue-600 dark:text-blue-400 mb-4">
              <FaGlobe className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multi-Platform Support</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Works seamlessly across Reddit, Twitter/X, YouTube, Facebook, and Instagram.
            </p>
          </div>

          {/* Real-Time Filtering */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="text-blue-600 dark:text-blue-400 mb-4">
              <MdAccessTime className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-Time Filtering</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Content is filtered instantly as you scroll, with no need to refresh the page.
            </p>
          </div>

          {/* Privacy First */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="text-blue-600 dark:text-blue-400 mb-4">
              <IoShieldCheckmark className="w-8 h-8" />
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
            Install Universal Ban
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
