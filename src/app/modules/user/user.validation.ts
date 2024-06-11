import { z } from 'zod';
import { userRole } from './user.model';

const userSchemaValidation = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string(),
  role: z.enum([...userRole] as [string, ...string[]]),
  address: z.string(),
});

export { userSchemaValidation };
