import { z } from 'zod';
import { vehicleType } from './booking.model';

const bookingSchemaValidation = z.object({
  body: z.object({
    serviceId: z.string(),
    slotId: z.string(),
    vehicleType: z.enum([...vehicleType] as [string, ...string[]]),
    vehicleBrand: z.string(),
    vehicleModel: z.string(),
    manufacturingYear: z.number(),
    registrationPlate: z.string(),
  }),
});

export default bookingSchemaValidation;
