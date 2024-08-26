import { z } from 'zod';

const serviceSchemaValidation = z.object({
  body: z.object({
    image: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    duration: z.number(),
  }),
});

const updateServiceSchemaValidation = z.object({
  body: z.object({
    image: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    duration: z.number().optional(),
  }),
});

export { serviceSchemaValidation, updateServiceSchemaValidation };
