import { z } from 'zod';

/**
 * Contact form validation schema
 * Enforces safe input constraints to prevent injection and abuse
 */
export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]*$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')
    .trim(),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .max(255, 'Email must be less than 255 characters')
    .email('Invalid email format')
    .toLowerCase(),
  
  message: z
    .string()
    .min(1, 'Message is required')
    .max(5000, 'Message must be less than 5000 characters')
    .trim(),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

/**
 * Sanitize HTML content to prevent XSS attacks
 * Removes script tags, event handlers, and dangerous HTML attributes
 */
export function sanitizeText(text: string): string {
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/on\w+(\s*)=(\s*)["'][^"']*["']/gi, '') // Remove event handlers
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .trim();
}
