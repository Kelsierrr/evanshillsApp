import { z } from 'zod';

export const contactInquirySchema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName:  z.string().min(2, 'Last name is required'),
    email:     z.string().email('Invalid email address'),
    phone:     z.string().min(10, 'Phone number is required to be at least 10 digits'),
    subject:   z.string().min(2, 'Subject is required'),
    message:   z.string().min(10, 'Message must be at least 10 characters'),
    consent:   z.literal(true, { errorMap: () => ({ message: 'Consent is required' }) })
  });