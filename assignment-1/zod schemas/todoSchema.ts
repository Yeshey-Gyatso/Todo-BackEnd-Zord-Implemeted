import { z } from 'zod';

const isNonBlankString = (value: string) => value.trim().length > 0;

export const TodoSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, "Title must not be blank")
      .max(15, "Max length must be 15")
      .refine(isNonBlankString, "Title must not be filled with spacebar"),
    description: z
      .string()
      .min(1, "Description must not be blank")
      .max(30, "Max length must be 30")
      .refine(isNonBlankString, "Description must not be filled with spacebar")
     
  }),
});


