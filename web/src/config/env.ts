import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1, 'Sanity Project ID is required'),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1, 'Sanity Dataset is required'),
  SANITY_API_READ_TOKEN: z.string().optional(),
  
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().min(1, 'Cloudinary Cloud Name is required'),
  NEXT_PUBLIC_CLOUDINARY_API_KEY: z.string().min(1, 'Cloudinary API Key is required'),
  CLOUDINARY_API_SECRET: z.string().min(1, 'Cloudinary API Secret is required'),
  
  NEXT_PUBLIC_SITE_URL: z.string().url('Site URL must be a valid URL'),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
});

// Since Next.js requires manual validation of public and secret env vars,
// we build an object containing all of them.
const parsedEnv = envSchema.safeParse({
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  NEXT_PUBLIC_CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
});

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  throw new Error('Invalid environment variables');
}

export const env = parsedEnv.data;
