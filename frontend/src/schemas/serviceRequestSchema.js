// frontend/src/schemas/serviceRequestSchema.js
import { z } from 'zod';

export const serviceRequestSchema = z.object({
  name:  z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required to be at least 10 digits'),
});
