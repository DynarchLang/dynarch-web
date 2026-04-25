const API_URL = 'http://localhost:3001/api';

export function getAuthToken() {
  return localStorage.getItem('dynarch_token');
}

export function setAuthToken(token: string) {
  localStorage.setItem('dynarch_token', token);
}

export function removeAuthToken() {
  localStorage.removeItem('dynarch_token');
}

export function getAuthUser() {
  const user = localStorage.getItem('dynarch_user');
  return user ? JSON.parse(user) : null;
}

export function setAuthUser(user: any) {
  localStorage.setItem('dynarch_user', JSON.stringify(user));
}

export function removeAuthUser() {
  localStorage.removeItem('dynarch_user');
}

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}
