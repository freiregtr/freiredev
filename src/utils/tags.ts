import type { CollectionEntry } from 'astro:content';

export interface TagInfo {
  slug: string;
  name: string;
  count: number;
  color: string;
}

// Obtener todos los tags únicos de los posts
export function getAllTags(posts: CollectionEntry<'blog'>[]): TagInfo[] {
  const tagMap = new Map<string, number>();

  posts.forEach(post => {
    if (post.data.tags && Array.isArray(post.data.tags)) {
      post.data.tags.forEach((tag: string) => {
        const normalizedTag = normalizeTag(tag);
        tagMap.set(normalizedTag, (tagMap.get(normalizedTag) || 0) + 1);
      });
    }
  });

  const tags = Array.from(tagMap.entries()).map(([slug, count]) => ({
    slug,
    name: formatTagName(slug),
    count,
    color: getTagColor(slug)
  }));

  // Ordenar por cantidad de posts (descendente) y luego alfabéticamente
  return tags.sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count;
    }
    return a.name.localeCompare(b.name);
  });
}

// Normalizar tag para URL (convertir a slug)
export function normalizeTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-');
}

// Formatear nombre del tag para mostrar
export function formatTagName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Obtener color para un tag
export function getTagColor(slug: string): string {
  const colorMap: Record<string, string> = {
    'typescript': '#00d9ff',
    'javascript': '#f7df1e',
    'fundamentos': '#6fc3df',
    'patrones-de-diseno': '#ff6b35',
    'poo': '#ff6b35',
    'variables': '#00d9ff',
    'funciones': '#00d9ff',
    'arrays': '#00d9ff',
    'objetos': '#00d9ff',
    'interfaces': '#00d9ff',
    'iot': '#ff6b35',
    'linux': '#ffd700',
    'hardware': '#ff6b35'
  };

  return colorMap[slug] || '#6fc3df'; // Color por defecto: cyan claro
}

// Obtener información de un tag específico
export function getTagInfo(slug: string, posts: CollectionEntry<'blog'>[]): TagInfo | undefined {
  const allTags = getAllTags(posts);
  return allTags.find(tag => tag.slug === slug);
}
