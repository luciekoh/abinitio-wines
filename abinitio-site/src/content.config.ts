import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const bilingualText = z.object({
  fr: z.string(),
  en: z.string(),
});

const wines = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/wines' }),
  schema: z.object({
    name: z.string(),
    vintage: z.number(),
    color: z.enum(['blanc', 'rouge']),
    category: z.enum(['philosophie', 'copains']),
    grapes: z.string(),
    label: z.string(),
    servir: z.string(),
    terroir: z.string(),
    taille: z.string(),
    certification: z.string(),
    vendanges: z.string(),
    analyse: z.object({
      soufre_total: z.string(),
      soufre_libre: z.string(),
      alcool: z.string(),
      appellation: z.string(),
    }),
    nameMeaning: bilingualText.optional(),
    slogan: bilingualText,
    about: bilingualText,
    millesime: bilingualText,
    vinification: bilingualText,
    degustation: bilingualText,
    table: bilingualText,
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    name: z.string(),
    date: z.string(),
    dateEnd: z.string().optional(),
    location: z.string(),
    description: bilingualText.optional(),
  }),
});

const salons = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/salons' }),
  schema: z.object({
    name: z.string(),
    name_en: z.string().optional(),
    start_date: z.coerce.date(),
    end_date: z.coerce.date(),
    city: z.string(),
    country: z.string().default('France'),
    type: z.enum(['pro', 'public', 'mixte']),
    url: z.string().optional(),
    notes: z.string().optional(),
    notes_en: z.string().optional(),
  }),
});

const importeurs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/importeurs' }),
  schema: z.object({
    pays: z.string(),
    nom: z.string(),
    ville: z.string(),
    url: z.string().optional(),
    ordre: z.number().default(99),
  }),
});

const points_de_vente = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/points-de-vente' }),
  schema: z.object({
    region: z.string(),
    dept: z.string(),
    nom: z.string(),
    ville: z.string(),
    url: z.string().optional(),
    ordre: z.number().default(99),
  }),
});

export const collections = { wines, events, salons, importeurs, points_de_vente };
