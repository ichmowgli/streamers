import 'dotenv/config';
import { z } from 'zod';

const envVariables = z.object({
  DATABASE_URL: z.string().url(),
  DEFAULT_IMAGE_URL: z.string().url().optional(),
});

export const env = envVariables.parse(process.env);
