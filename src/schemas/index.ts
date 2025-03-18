import { z } from "zod";

// Schema for individual ad in the ads array
const adSchema = z.object({
  ad: z.string().min(1, "Ad ID is required"), // Ad ID
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
    message: "Start time must be in HH:MM:SS format",
  }), // HH:MM:SS format
});

// Live Stream Form Schema
export const liveStreamFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  thumbnail: z.string().optional(),
  shortDescription: z.string().optional(),
  videoUrl: z.string().min(1, "Video URL is required"),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  startDateTime: z.string().min(1, "Start date and time are required"),
  videoEnabled: z.boolean().default(true),
  monetizationEnabled: z.boolean().default(false),
  adsEnabled: z.boolean().default(false),
  ads: z.array(adSchema).optional(), // Added ads array
  specifyTeams: z.boolean().default(false),
  teamId: z.array(z.string()).optional(),
});

export type LiveStreamFormValues = z.infer<typeof liveStreamFormSchema>;

// Video Form Schema
export const videoFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  thumbnail: z.string().optional(),
  shortDescription: z.string().optional(),
  videoUrl: z.string().min(1, "Video URL is required"),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  length: z.number().min(1, "Video length must be at least 1 second"),
  videoEnabled: z.boolean().default(true),
  releaseDate: z.date().optional(),
  monetizationEnabled: z.boolean().default(false),
  adsEnabled: z.boolean().default(false),
  ads: z.array(adSchema).optional(), // Added ads array
  adCount: z.number().min(0).optional(),
  specifyTeams: z.boolean().default(false),
  teamId: z.array(z.string()).optional(),
});

export type VideoFormValues = z.infer<typeof videoFormSchema>;
