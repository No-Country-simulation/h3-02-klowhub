import { z } from 'zod';

export const idSchema = z.string().or(z.number());
export const nameSchema = z.string();
export const descriptionSchema = z.string().optional();

export const baseNameSchema = z.object({
  id: idSchema,
  name: nameSchema,
  description: descriptionSchema,
});

export const baseTitleSchema = z.object({
  id: idSchema,
  title: nameSchema,
  description: descriptionSchema,
});
