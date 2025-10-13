import type { CollectionEntry } from 'astro:content';

export interface CategoryInfo {
  name: string;
  slug: string;
  color: string;
  description: string;
  count: number;
}

export interface SubcategoryInfo {
  name: string;
  slug: string;
  category: string;
  count: number;
}

// Colores predefinidos para categorías comunes
const DEFAULT_CATEGORY_COLORS: Record<string, string> = {
  typescript: '#00d9ff',
  javascript: '#f7df1e',
  python: '#3776ab',
  rust: '#ff6b35',
  go: '#00add8',
  java: '#007396',
  iot: '#ff6b35',
  programacion: '#6fc3df',
  linux: '#ffd700',
  cloud: '#4285f4',
  devops: '#326ce5',
  docker: '#2496ed',
  kubernetes: '#326ce5',
};

// Generador de colores aleatorios para nuevas categorías
function generateColor(seed: string): string {
  const colors = [
    '#00d9ff', '#ff6b35', '#6fc3df', '#ffd700', '#4285f4',
    '#ff4081', '#7c4dff', '#64ffda', '#ffab40', '#69f0ae'
  ];

  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}

// Capitaliza primera letra de cada palabra
function capitalize(str: string): string {
  return str
    .split(/[-_\s]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Obtener todas las categorías únicas con su info
export function getAllCategories(posts: CollectionEntry<'blog'>[]): CategoryInfo[] {
  const categoryMap = new Map<string, CategoryInfo>();

  posts.forEach(post => {
    const slug = post.data.category;

    if (!categoryMap.has(slug)) {
      categoryMap.set(slug, {
        name: capitalize(slug),
        slug,
        color: DEFAULT_CATEGORY_COLORS[slug] || generateColor(slug),
        description: `Posts sobre ${capitalize(slug)}`,
        count: 0
      });
    }

    const category = categoryMap.get(slug)!;
    category.count++;
  });

  return Array.from(categoryMap.values()).sort((a, b) =>
    b.count - a.count // Ordenar por cantidad de posts
  );
}

// Obtener todas las subcategorías únicas
export function getAllSubcategories(posts: CollectionEntry<'blog'>[]): SubcategoryInfo[] {
  const subcategoryMap = new Map<string, SubcategoryInfo>();

  posts.forEach(post => {
    const subcategory = post.data.subcategory;
    if (!subcategory) return;

    const key = `${post.data.category}-${subcategory}`;

    if (!subcategoryMap.has(key)) {
      subcategoryMap.set(key, {
        name: capitalize(subcategory),
        slug: subcategory,
        category: post.data.category,
        count: 0
      });
    }

    const sub = subcategoryMap.get(key)!;
    sub.count++;
  });

  return Array.from(subcategoryMap.values()).sort((a, b) =>
    b.count - a.count
  );
}

// Obtener subcategorías de una categoría específica
export function getSubcategoriesByCategory(
  posts: CollectionEntry<'blog'>[],
  categorySlug: string
): SubcategoryInfo[] {
  return getAllSubcategories(posts).filter(
    sub => sub.category === categorySlug
  );
}

// Obtener info de una categoría específica
export function getCategoryInfo(
  posts: CollectionEntry<'blog'>[],
  categorySlug: string
): CategoryInfo | undefined {
  return getAllCategories(posts).find(cat => cat.id === categorySlug);
}

// Obtener posts por categoría
export function getPostsByCategory(
  posts: CollectionEntry<'blog'>[],
  categorySlug: string
): CollectionEntry<'blog'>[] {
  return posts.filter(post => post.data.category === categorySlug);
}

// Obtener posts por subcategoría
export function getPostsBySubcategory(
  posts: CollectionEntry<'blog'>[],
  subcategorySlug: string
): CollectionEntry<'blog'>[] {
  return posts.filter(post => post.data.subcategory === subcategorySlug);
}
