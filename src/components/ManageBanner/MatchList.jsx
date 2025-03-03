import React, { useState } from "react";
import { Link } from "react-router-dom";

const matches = [
  {
    id: 1,
    title: "Noteworthy Technology Acquisitions 2021",
    description:
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    image: "/305_plus.png",
    videoUrl: "https://www.youtube.com/embed/CorTHNsGt-Y",
  },
  {
    id: 2,
    title: "Top 10 AI Innovations in 2023",
    description:
      "These AI advancements are shaping the future of technology and automation.",
    image: "/coder.jpeg",
    videoUrl: "https://www.youtube.com/embed/CorTHNsGt-Y",
  },
  {
    id: 3,
    title: "Breakthroughs in Quantum Computing",
    description:
      "Quantum computing is revolutionizing how we process data at unprecedented speeds.",
    image: "/programmer.jpeg",
    videoUrl: "https://www.youtube.com/embed/CorTHNsGt-Y",
  },
];

function MatchList({ match }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-sm w-72 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-center">
        <Link>
          <img
            className="rounded-full  h-40 w-40 mt-3"
            src={match.image}
            alt={match.title}
          />
        </Link>
      </div>
      <div className="p-5">
        <Link>
          <h4 className="mb-2 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {match.title}
          </h4>
        </Link>
        <p className="mb-3 text-justify font-normal text-gray-700 dark:text-gray-400">
          {match.description}
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-700 flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Watch Video
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#1f2937] p-4 rounded-lg shadow-lg max-w-2xl w-full h-auto relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-1 right-1 text-gray-700 hover:text-red-600 text-6xl"
            >
              ×
            </button>
            <iframe
              className="w-full h-[500px] rounded-lg p-5"
              src={match.videoUrl}
              title="YouTube Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

function MatchListContainer() {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {matches.map((match) => (
        <MatchList key={match.id} match={match} />
      ))}
    </div>
  );
}

export default MatchListContainer;
