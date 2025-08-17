const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

export class HttpError extends Error {
  constructor(public status: number, public body?: unknown) {
    super(`HTTP ${status}`)
  }
}

export async function fetchJson<T>(
  path: string,
  init?: RequestInit & { timeoutMs?: number }
): Promise<T> {
  const { timeoutMs = 10000, method, headers, body, ...rest } = init || {}
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: method || 'GET',
      signal: controller.signal,
      // IMPORTANT: no Content-Type on GET to avoid preflight
      headers: {
        Accept: 'application/json',
        ...(headers || {}),
      },
      // Only attach a JSON body for non-GET
      ...(body ? { body: typeof body === 'string' ? body : JSON.stringify(body) } : {}),
      ...rest,
    })

    const text = await res.text()
    const data = text ? (JSON.parse(text) as T) : (undefined as unknown as T)
    if (!res.ok) throw new HttpError(res.status, data)
    return data
  } finally {
    clearTimeout(id)
  }
}