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
