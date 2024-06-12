import { z } from 'zod';
import { userRole } from './user.model';

const userSchemaValidation = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    phone: z.string(),
    role: z.enum([...userRole] as [string, ...string[]]),
    address: z.string(),
  }),
});

const loginSchemaValidation = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is Required' }).email(),
    password: z.string({ required_error: 'Password is Required' }),
  }),
});

export { userSchemaValidation, loginSchemaValidation };
