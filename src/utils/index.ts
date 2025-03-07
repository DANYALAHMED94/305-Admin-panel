import axios from "axios";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/upload/single`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  console.log("Here is response", response.data);

  return response.data.imageUrl;
};

export const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return "00:00:00"; // Handle invalid input

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  // Pad with leading zeros
  const pad = (num: number) => num.toString().padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
};
