import { z } from 'zod';

const isNonBlankString = (value: string) => value.trim().length > 0;


export const authSchema = z.object({
    body:z.object({
        username: z
    .string()
    .min(5, 'Username must be at least 5 characters').max(50, "Max length must be 15")
    .refine(isNonBlankString, 'Username must not be blank'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .refine(isNonBlankString, 'Password must not be blank'),
    })
  
});
