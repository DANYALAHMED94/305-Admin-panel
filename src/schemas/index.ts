import { z } from "zod";

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
  specifyTeams: z.boolean().default(false),
  teamId: z.array(z.string()).optional(),
});

export type LiveStreamFormValues = z.infer<typeof liveStreamFormSchema>;

export const videoFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  thumbnail: z.string().optional(),
  shortDescription: z.string().optional(),
  videoUrl: z.string().min(1, "Video URL is required"),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  length: z.number().min(1, "Video length must be at least 1 second"),
  videoEnabled: z.boolean().default(true),
  releaseDate: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
  monetizationEnabled: z.boolean().default(false),
  adsEnabled: z.boolean().default(false),
  specifyTeams: z.boolean().default(false), // New field for the switch
  teamId: z.array(z.string()).optional(), // New field for selected teams
});

export type VideoFormValues = z.infer<typeof videoFormSchema>;
