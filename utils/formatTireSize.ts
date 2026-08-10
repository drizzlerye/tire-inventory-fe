export function formatTireSize(size: string): string {
  return size.trim().replace(/\s+/g, '').toUpperCase();
}
