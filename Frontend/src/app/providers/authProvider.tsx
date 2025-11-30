import type { PropsWithChildren } from 'react'
import { Auth0Provider } from '@auth0/auth0-react'
import { env } from '../../core/env'


export const AuthProvider = ({ children }: PropsWithChildren) => {
  return (
    <Auth0Provider
      domain={env.VITE_AUTH0_DOMAIN}
      clientId={env.VITE_AUTH0_CLIENT}
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      {children}
    </Auth0Provider>
  )
}
