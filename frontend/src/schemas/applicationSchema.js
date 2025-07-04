import { z } from 'zod';

export const applicationSchema = z.object({
  name:        z.string().min(2, 'Name is required'),
  email:       z.string().email('Invalid email address'),
  phone:       z.string().min(7, 'Phone is required'),
  coverLetter: z.string().min(20, 'Cover letter must be at least 20 characters'),
  resume:      z
    .any()
    .refine(file => file instanceof File, 'Resume is required')
    .refine(file => ['application/pdf', 'application/msword', 
                     'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
                   .includes(file.type),
            'Only PDF or DOC/DOCX allowed')
});
