import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const legal = defineCollection({
  loader: glob({
    pattern: ['*.md'],
    base: './src/content/legal',
    // Astro's default id slugifies the filename, turning `privacy.fr.md` into
    // `privacyfr`. Keep the locale suffix intact so `getEntry('legal','privacy.fr')` resolves.
    generateId: ({ entry }) => entry.replace(/\.[^./]+$/, ''),
  }),
  schema: z.object({
    kind: z.enum(['terms', 'privacy']),
    locale: z.enum(['en', 'fr', 'ht']),
    updated: z.string(),
  }),
});

export const collections = { legal };
