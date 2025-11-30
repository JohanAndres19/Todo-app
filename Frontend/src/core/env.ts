function requiredEnv(name: string, value?: string): string {
  if (!value) throw new Error(`Missing env variable: ${name}`)
  return value
}


export const env = {
  VITE_AUTH0_DOMAIN: requiredEnv('VITE_AUTH0_DOMAIN', import.meta.env.VITE_AUTHO_DOMAIN as string | undefined),
  VITE_AUTH0_CLIENT: requiredEnv('VITE_AUTH0_CLIENT_ID', import.meta.env.VITE_AUTH0_CLIENT_ID as string | undefined),
  VITE_API_URL: requiredEnv('VITE_API_URL', import.meta.env.VITE_API_URL as string | undefined),
  VITE_AUTH0_AUDIENCE: requiredEnv('VITE_AUTH0_AUDIENCE', import.meta.env.VITE_AUTH0_AUDIENCE as string | undefined)

}
