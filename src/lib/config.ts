/**
 * Dynamic URL Configuration
 * Provides base URLs for API calls and seed endpoints
 */

export function getBaseUrl(): string {
  // Server-side: Use environment variables or Vercel URL
  if (typeof window === "undefined") {
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    if (process.env.NEXT_PUBLIC_API_URL) {
      return process.env.NEXT_PUBLIC_API_URL;
    }
    return "http://localhost:3000";
  }

  // Client-side: Use relative URLs or environment variable
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // Return empty string to use relative URLs on client
  return "";
}

export function getApiUrl(path: string): string {
  const baseUrl = getBaseUrl();
  // If baseUrl is empty, return relative path
  if (!baseUrl) {
    return path.startsWith("/") ? path : `/${path}`;
  }
  // Otherwise build full URL
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getSeedAdminUrl(): string {
  return getApiUrl("/api/auth/seed-admin");
}
