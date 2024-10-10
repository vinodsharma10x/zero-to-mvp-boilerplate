const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function fetchApi(endpoint: string, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, options)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong')
  }

  return data
}
