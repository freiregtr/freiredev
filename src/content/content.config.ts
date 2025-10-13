import { defineCollection, z } from 'astro:content';
import { image } from 'astro:assets';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().optional(),
    category: z.string(),
    subcategory: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().default('Ramon Freire'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
