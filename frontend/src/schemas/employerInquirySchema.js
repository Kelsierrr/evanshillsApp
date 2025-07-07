import { z } from 'zod';

export const employerInquirySchema = z.object({
    companyName: z.string().min(2, 'Company name is required'),
    contactPerson: z.string().min(2, 'Contact person is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    industry:       z.string().min(2, 'Industry is required'),
    positions:    z.preprocess(val => Number(val), z.number().min(1, 'At least 1 position required')),
    details:        z.string().min(10, 'Details must be at least 10 characters')
  });