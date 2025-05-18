export async function api(path: string, options: RequestInit = {}) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')

  const response = await fetch(`${apiURL}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()

  return data
}
