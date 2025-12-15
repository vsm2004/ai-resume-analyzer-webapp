/**
 * Formats a byte size into a human-readable string (e.g., "1.2 KB", "3.5 MB").
 * @param bytes - The size in bytes.
 * @returns A string representing the size in the appropriate unit.
 */
export function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export const generateUUID =()=> crypto.randomUUID();