export type Sport = {
  _id: string;
  name: string;
  imageUrl?: string;
};

export type Team = {
  _id: string;
  name: string;
  type: "general" | "school";
  category: string;
  categories?: string[];
  imageUrl?: string;
};

export type TeamFull = {
  _id: string;
  name: string;
  type: "general" | "school";
  category: {
    _id: string;
    name: string;
  };
  categories?: string[];
  imageUrl?: string;
};

export type Category = {
  _id: string;
  name: string;
  imageUrl?: string;
  parentCategory?: string;
};

export type Video = {
  _id: string;
  title: string;
  type: "recorded" | "live";
  thumbnail?: string;
  shortDescription?: string;
  teamId?: string[];
  category?: string;
  categories: string[];
  tags: string[];
  videoUrl: string;
  viewsCount: number;
  monetizationEnabled: boolean;
  adsEnabled: boolean;
  ads: {
    ad: string; // Ad ID
    startTime: string; // HH:MM:SS format
  }[];
  length: number;
  videoEnabled: boolean;
  uploadDate?: Date;
  releaseDate?: Date;

  startDateTime?: Date;
};

export type VideoFull = {
  _id: string;
  title: string;
  type: "recorded" | "live";
  thumbnail?: string;
  shortDescription?: string;
  teamId?: {
    _id: string;
    name: string;
  }[];
  category?: {
    _id: string;
    name: string;
  };
  categories: string[];
  tags: string[];
  videoUrl: string;
  viewsCount: number;
  monetizationEnabled: boolean;
  adsEnabled: boolean;
  ads: {
    ad: string; // Ad ID
    startTime: string; // HH:MM:SS format
  }[];
  length: number;
  videoEnabled: boolean;
  uploadDate?: Date;
  releaseDate?: Date;

  startDateTime?: Date;
};

export type Banner = {
  _id: string;
  imageUrl: string;
  videoId: string;
  isActive: boolean;
};

export type BannerFull = {
  _id: string;
  imageUrl: string;
  videoId: {
    _id: string;
    title: string;
    thumbnail: string;
  };
  isActive: boolean;
};

export type Ad = {
  _id: string;
  title: string;
  type: "image" | "video";
  mediaUrl: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};
