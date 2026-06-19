
import { getToken } from "./token";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = await getToken();
  return fetch(`${process.env.EXPO_PUBLIC_API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
}