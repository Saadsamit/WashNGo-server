import { z } from 'zod';

const serviceSchemaValidation = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    duration: z.number(),
    isDeleted: z.boolean().default(false),
  }),
});

const updateServiceSchemaValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    duration: z.number().optional(),
  }),
});

export { serviceSchemaValidation, updateServiceSchemaValidation };
