import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const UPLOAD_URL = "/upload";

/**
 * Upload a single image
 * @param file - The file to upload
 * @returns The uploaded file data
 */
export const uploadSingleImage = async (file: File): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(
      `${API_URL}${UPLOAD_URL}/single`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading single image:", error);
    throw new Error("Failed to upload single image");
  }
};

/**
 * Upload multiple images
 * @param files - Array of files to upload
 * @returns The uploaded files data
 */
export const uploadMultipleImages = async (files: File[]): Promise<any> => {
  try {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    const response = await axios.post(
      `${API_URL}${UPLOAD_URL}/multiple`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading multiple images:", error);
    throw new Error("Failed to upload multiple images");
  }
};

/**
 * Generate a presigned URL for uploading a file
 * @param fileName - Name of the file
 * @param type - Type of file (e.g., image, video)
 * @param contentType - MIME type of the file (optional)
 * @returns The presigned URL
 */
export const generatePresignedUrl = async (
  fileName: string,
  type: string,
  contentType?: string
): Promise<{ url: string }> => {
  try {
    const response = await axiosInstance.post(`${UPLOAD_URL}/generate-url`, {
      fileName,
      type,
      contentType,
    });

    return response.data;
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    throw new Error("Failed to generate presigned URL");
  }
};

/**
 * Start a multipart upload
 * @param fileName - Name of the file
 * @param type - Type of file (e.g., image, video)
 * @param contentType - MIME type of the file
 * @returns The upload ID
 */
export const startMultipartUpload = async (
  fileName: string,
  type: string,
  contentType: string
): Promise<{ uploadId: string }> => {
  try {
    const response = await axiosInstance.post(`${UPLOAD_URL}/start-upload`, {
      fileName,
      type,
      contentType,
    });

    return response.data;
  } catch (error) {
    console.error("Error starting multipart upload:", error);
    throw new Error("Failed to start multipart upload");
  }
};

/**
 * Generate presigned URLs for multipart upload parts
 * @param fileName - Name of the file
 * @param type - Type of file (e.g., image, video)
 * @param uploadId - Upload ID from the startMultipartUpload response
 * @param partCount - Number of parts to generate URLs for
 * @returns Array of presigned URLs
 */
export const generateMultipartUrls = async (
  fileName: string,
  type: string,
  uploadId: string,
  partCount: number
): Promise<{ presignedUrls: string[] }> => {
  try {
    const response = await axiosInstance.post(
      `${UPLOAD_URL}/generate-multipart-urls`,
      {
        fileName,
        type,
        uploadId,
        partCount,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error generating multipart URLs:", error);
    throw new Error("Failed to generate multipart URLs");
  }
};

/**
 * Complete a multipart upload
 * @param fileName - Name of the file
 * @param type - Type of file (e.g., image, video)
 * @param uploadId - Upload ID from the startMultipartUpload response
 * @param parts - Array of parts with ETag and PartNumber
 * @returns The completed upload data
 */
export const completeMultipartUpload = async (
  fileName: string,
  type: string,
  uploadId: string,
  parts: Array<{ ETag: string; PartNumber: number }>
): Promise<any> => {
  try {
    // Ensure parts are sorted by PartNumber
    const sortedParts = parts.sort((a, b) => a.PartNumber - b.PartNumber);

    // Construct the MultipartUpload object
    const multipartUpload = {
      Parts: sortedParts.map((part) => ({
        ETag: part.ETag,
        PartNumber: part.PartNumber,
      })),
    };

    const response = await axiosInstance.post(`${UPLOAD_URL}/complete-upload`, {
      fileName,
      type,
      uploadId,
      MultipartUpload: multipartUpload, // Ensure this matches the expected schema
    });

    return response.data;
  } catch (error) {
    console.error("Error completing multipart upload:", error);
    throw new Error("Failed to complete multipart upload");
  }
};
