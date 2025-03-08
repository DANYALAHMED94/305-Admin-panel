"use client";

import React from "react";
import BannerForm from "@/components/banners/BannerForm";
import { useRouter } from "next/navigation";

const CreateBannerPage = () => {
  const router = useRouter();

  return (
    <div className="p-6">
      <div className="my-3 max-w-[900px] rounded-2xl p-6 bg-white shadow-lg mx-auto mb-32">
        <h1 className="text-2xl font-bold mb-4">Create Banner</h1>
        <BannerForm onSuccess={() => router.push("/banners")} />
      </div>
    </div>
  );
};

export default CreateBannerPage;
