import Image from "next/image";
import Layout from './components/Layout';
import { FaReddit, FaTwitter, FaYoutube, FaInstagram, FaGithub, FaFacebook } from 'react-icons/fa';

export default function Home() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
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

        {/* Call to Action and Demo */}
        <div className="flex flex-col items-center">
          <div className="flex justify-center gap-4 mb-8">
            <a
              href="https://chromewebstore.google.com/detail/universalban/hmildncdjklmgkdccblpjlompemkanpp"
              className="inline-flex items-center px-4 py-2 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Install
            </a>
            <a
              href="https://github.com/alielbekov/universalban"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-lg font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="w-6 h-6 mr-2" />
              Source
            </a>
          </div>

          {/* Demo Video */}
          <div className="w-full max-w-3xl">
            <div className="relative pb-[56.25%] h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/1oo7K-80BL8"
                title="UniversalBan Demo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>

      </div>

      {/* Fixed Webstore Badge */}
      <a
        href="https://chromewebstore.google.com/detail/universalban/hmildncdjklmgkdccblpjlompemkanpp"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 hover:opacity-90 transition-opacity z-50"
      >
        <Image
          src="/availablewebstore.png"
          alt="Available in the Chrome Web Store"
          width={200}
          height={60}
          priority
          className="drop-shadow-lg"
        />
      </a>
    </Layout>
  );
}
