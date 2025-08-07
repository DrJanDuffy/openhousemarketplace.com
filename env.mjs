import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]),
    VERCEL_URL: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().optional(),
    // RealScout Integration
    NEXT_PUBLIC_REAL_SCOUT_API_URL: z.string().url().optional(),
    NEXT_PUBLIC_REAL_SCOUT_CLIENT_ID: z.string().optional(),
    NEXT_PUBLIC_REAL_SCOUT_REDIRECT_URI: z.string().url().optional(),
    // Google Maps Integration
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().optional(),
    // Analytics
    NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_REAL_SCOUT_API_URL: process.env.NEXT_PUBLIC_REAL_SCOUT_API_URL,
    NEXT_PUBLIC_REAL_SCOUT_CLIENT_ID: process.env.NEXT_PUBLIC_REAL_SCOUT_CLIENT_ID,
    NEXT_PUBLIC_REAL_SCOUT_REDIRECT_URI: process.env.NEXT_PUBLIC_REAL_SCOUT_REDIRECT_URI,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
})
