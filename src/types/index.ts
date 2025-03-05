export type Sport = {
  _id: string;
  name: string;
  imageUrl?: string;
};

export type Team = {
  _id: string;
  name: string;
  type: "general" | "school";
  sport: string;
  imageUrl?: string;
};
