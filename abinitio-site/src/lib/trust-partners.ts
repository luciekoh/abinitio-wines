import { getCollection } from 'astro:content';

const TRUST_SLUGS = [
  'manoir-regate',
  'chateau-maubreuil',
  'le-panorama',
  'gush',
  'etna-mazarine',
  'auberge-madeleine',
  'le-saint-paul',
  'de-nature-gourmande',
  'sybarite',
  'cave-de-la-ria',
  'la-cave-des-quais',
  'cave-la-felicite',
  'caves-de-prague',
  'atlantide',
  'muscadotheque',
];

export async function getTrustPartners() {
  const pdv = await getCollection('points_de_vente');
  return TRUST_SLUGS
    .map((slug) => pdv.find((p) => p.id === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => ({ name: p.data.nom, town: p.data.ville }));
}
