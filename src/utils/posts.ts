/**
 * Converts a content collection entry ID to a URL slug
 * Removes /index.md or /index.mdx from the end
 *
 * @param id - The entry ID from the content collection
 * @returns The URL slug without the filename
 */
export function getSlugFromId(id: string): string {
  return id.replace(/\/index\.(md|mdx)$/, '');
}
