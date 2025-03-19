"use client"; // Mark as Client Component

import { Button } from "@/components/ui/button"; // shadcn Button component
import { FaExclamationTriangle } from "react-icons/fa"; // Icon from react-icons
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Icon */}
      <div className="mb-6 text-8xl text-blue-600">
        <FaExclamationTriangle />
      </div>

      {/* Title */}
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>

      {/* Subtitle */}
      <p className="text-xl text-gray-600 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Button to go back home */}
      <Link href="/dashboard">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
