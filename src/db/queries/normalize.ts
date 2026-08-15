export function normalizeSearchQuery(query: string): string {
  return query.trim().replace(/\s+/g, " ");
}

export function isSearchableQuery(query: string): boolean {
  return normalizeSearchQuery(query).length > 0;
}

export function toSearchPattern(query: string): string {
  return `%${normalizeSearchQuery(query)}%`;
}
