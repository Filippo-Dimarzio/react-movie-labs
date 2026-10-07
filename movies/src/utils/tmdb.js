const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3'

export function createTmdbRequest(path, credential) {
  const url = new URL(`${TMDB_API_BASE_URL}${path}`)
  const normalizedCredential = credential
    .trim()
    .replace(/^Bearer\s+/i, '')
    .trim()
  const isReadAccessToken = /^[^.]+\.[^.]+\.[^.]+$/.test(normalizedCredential)

  if (isReadAccessToken) {
    return {
      url: url.toString(),
      options: {
        headers: { Authorization: `Bearer ${normalizedCredential}` },
      },
    }
  }

  url.searchParams.set('api_key', normalizedCredential)
  return { url: url.toString(), options: {} }
}

export async function createTmdbError(response, requestType) {
  let message = ''

  if (response.headers.get('content-type')?.includes('application/json')) {
    try {
      const body = await response.json()
      if (body && typeof body === 'object' && typeof body.status_message === 'string') {
        message = body.status_message
      }
    } catch (error) {
      if (!(error instanceof SyntaxError)) throw error
    }
  }

  const reason = message || response.statusText || 'Unknown error'
  return new Error(
    `TMDB ${requestType} failed with status ${response.status}: ${reason}`,
  )
}
