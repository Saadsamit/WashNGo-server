import { z } from 'zod';

const ratingSchemaValidation = z.object({
  body: z.object({
    feedback: z.string().trim(),
    rating: z.number(),
  }),
});

export default ratingSchemaValidation;
