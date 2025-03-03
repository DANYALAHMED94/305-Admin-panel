"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Match {
  id: number;
  title: string;
  description: string;
  image: string;
  videoUrl: string;
}

const matches: Match[] = [
  {
    id: 1,
    title: "Noteworthy Technology Acquisitions 2021",
    description:
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
    image: "https://ik.imagekit.io/deveoper99/305_plus.png",
    videoUrl: "https://www.youtube.com/embed/CorTHNsGt-Y",
  },
  {
    id: 2,
    title: "Top 10 AI Innovations in 2023",
    description:
      "These AI advancements are shaping the future of technology and automation.",
    image: "https://ik.imagekit.io/deveoper99/coder.jpg",
    videoUrl: "https://www.youtube.com/embed/CorTHNsGt-Y",
  },
  {
    id: 3,
    title: "Breakthroughs in Quantum Computing",
    description:
      "Quantum computing is revolutionizing how we process data at unprecedented speeds.",
    image: "https://ik.imagekit.io/deveoper99/programmer.jpg",
    videoUrl: "https://www.youtube.com/embed/CorTHNsGt-Y",
  },
];

const MatchCard = ({ match }: { match: Match }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-sm w-72 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-center">
        <Link href="#">
          <Image
            className="rounded-full h-40 w-40 mt-3"
            src={match.image}
            alt={match.title}
            width={160}
            height={160}
          />
        </Link>
      </div>
      <div className="p-5">
        <Link href="#">
          <h4 className="mb-2 text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {match.title}
          </h4>
        </Link>
        <p className="mb-3 text-justify font-normal text-gray-700 dark:text-gray-400">
          {match.description}
        </p>
        <div className="flex justify-center">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsOpen(true)} variant="default">
                Watch Video <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 p-6 rounded-lg max-w-2xl">
              <iframe
                className="w-full h-[500px] rounded-lg"
                src={match.videoUrl}
                title="YouTube Video"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

const MatchListContainer = () => {
  return (
    <div className="flex flex-wrap gap-4 ">
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
};

export default MatchListContainer;
