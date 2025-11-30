import { useAuth0 } from '@auth0/auth0-react'
import { useCallback } from 'react'
import { env } from '../../core/env.ts'

export const useAuthHeaders = () => {
  const { getAccessTokenSilently } = useAuth0()


  const getHeaders = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: env.VITE_AUTH0_AUDIENCE,
          scope: "read:todos write:todos"
        }
      })
      return token ? { Authorization: `Bearer ${token}` } : {}
    } catch (e) {
      console.log(`no se porque se rompio ${e}`)
      return {}
    }
  }, [getAccessTokenSilently])


  return { getHeaders }
}
