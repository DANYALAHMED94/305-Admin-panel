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
