const API_URL = process.env.EXPO_PUBLIC_API_URL;

const request = async <T>(
  method: string,
  route: string,
  body?: object,
  token?: string,
): Promise<T> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/${route}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const api = {
  post: <T>(route: string, body: object) => request<T>("POST", route, body),

  authPost: <T>(route: string, body: object, token: string) =>
    request<T>("POST", route, body, token),

  authGet: <T>(route: string, token: string) =>
    request<T>("GET", route, undefined, token),
};
