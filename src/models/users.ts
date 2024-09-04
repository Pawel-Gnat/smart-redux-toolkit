import { z } from 'zod';

const GeoSchema = z.object({
  lat: z.string(),
  lng: z.string(),
});

const AddressSchema = z.object({
  street: z.string(),
  suite: z.string(),
  city: z.string(),
  zipcode: z.string(),
  geo: GeoSchema,
});

const CompanySchema = z.object({
  name: z.string(),
  catchPhrase: z.string(),
  bs: z.string(),
});

export const UserSchema = z.object({
  address: AddressSchema,
  company: CompanySchema,
  email: z.string().email(),
  id: z.number(),
  name: z.string(),
  phone: z.string(),
  website: z.string(),
  username: z.string(),
});

export const UserResponseSchema = z.object({
  users: z.array(UserSchema),
});

export type User = z.infer<typeof UserSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
