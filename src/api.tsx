//this file was added 
//its reading the base URL
//currently just exposing the login and register endpoints 
// Load base API URL from environment variables and injecting JWT 
//for authorization. In simple terms - this file connects all endpoints 
const API = import.meta.env.VITE_API_URL as string;
// Send credentials to login endpoint and return auth data

// Helper for protected API calls requiring a bearer token
export async function authFetch<T>(
  path: string, // API path to append to base URL
  token: string, // Bearer token for authorization
  init: RequestInit = {} 
): Promise<T> {
  // Perform fetch with authorization header included
  const res = await fetch(`${API}${path}`, {
    ...init, 
    headers: {
      ...(init.headers ?? {}), // Merge existing headers if present
      Authorization: `Bearer ${token}`, // Set Bearer token header
    },
  });
  // Throw error details if response not OK
  if (!res.ok) throw await res.json();
  // Parse and return JSON response as generic type
  return res.json() as Promise<T>;
}

// Send new user info to registration endpoint
export async function register(username: string, password: string) {
  // Make POST request to authentication register endpoint
  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw await res.json();
}

export async function login(username: string, password: string) {
  // Make POST request to authentication login endpoint
  const res = await fetch(`${API}/auth/login`, {
    // Use HTTP POST method
    method: 'POST',
    // Set content type to form-urlencoded
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //  username and password as URL search params
    body: new URLSearchParams({ username, password }),
  });
  // Throw error details if response not OK
  if (!res.ok) throw await res.json();
  // Parse and return JSON response with access token
  return res.json() as Promise<{ access_token: string; expires_in: number }>;
}