import { z } from 'zod';

const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

const slotSchemaValidation = z.object({
  body: z.object({
    service: z.string().trim(),
    date: z.string(),
    startTime: z.string().refine((val) => timePattern.test(val), {
      message: 'Ensures the time is in HH:MM format (24-hour)',
    }),
    endTime: z.string().refine((val) => timePattern.test(val), {
      message: 'Ensures the time is in HH:MM format (24-hour)',
    }),
  }),
});

export default slotSchemaValidation;
