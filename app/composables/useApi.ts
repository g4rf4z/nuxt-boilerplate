export function useApi() {
  const config = useRuntimeConfig()
  const api = config.public.api

  const apiGet = async <T>(
    path: string,
    params?: Record<string, unknown>,
  ): Promise<T> => {
    return await $fetch<T>(`${api}${path}`, {
      method: 'GET',
      credentials: 'include',
      params,
    })
  }

  const apiPost = async <T>(
    path: string,
    data?: Record<string, unknown>,
  ): Promise<T> => {
    return await $fetch<T>(`${api}${path}`, {
      method: 'POST',
      credentials: 'include',
      body: data,
    })
  }

  const apiPatch = async <T>(
    path: string,
    data?: Record<string, unknown>,
  ): Promise<T> => {
    return await $fetch<T>(`${api}${path}`, {
      method: 'PATCH',
      credentials: 'include',
      body: data,
    })
  }

  const apiDelete = async <T>(
    path: string,
    params?: Record<string, unknown>,
  ): Promise<T> => {
    return await $fetch<T>(`${api}${path}`, {
      method: 'DELETE',
      credentials: 'include',
      params,
    })
  }

  return {
    apiGet,
    apiPost,
    apiPatch,
    apiDelete,
  }
}
