"use client";

/**
 * Hook for making API calls with dynamic base URL
 * Supports both relative paths and full URLs
 */

export function useApi() {
  const getApiUrl = (path: string): string => {
    // Use NEXT_PUBLIC_API_URL if available, otherwise relative URL
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    
    if (!baseUrl) {
      // Use relative URL (same origin)
      return path.startsWith("/") ? path : `/${path}`;
    }

    // Use full URL with base
    return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  };

  return { getApiUrl };
}
