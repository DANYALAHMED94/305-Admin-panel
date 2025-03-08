"use client";

import React from "react";
import BannerList from "@/components/banners/BannerList";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const BannersPage = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Banners</h1>
        <Link href="/banners/create">
          <Button>Create Banner</Button>
        </Link>
      </div>
      <BannerList />
    </div>
  );
};

export default BannersPage;
