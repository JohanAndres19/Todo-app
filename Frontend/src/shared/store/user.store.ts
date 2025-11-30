import { makeAutoObservable } from 'mobx'

export type SafeUser = { id: string; email?: string; name?: string } | null

export class UserStore {
  user: SafeUser = null
  loading = true
  isAuthenticated = false

  constructor() {
    makeAutoObservable(this)
  }

  syncFromAuth0(auth0User: any) {
    if (!auth0User) {
      this.user = null
      this.isAuthenticated = false
      return
    }
    this.user = { id: auth0User.sub ?? auth0User.__id, email: auth0User.email, name: auth0User.name }
    this.isAuthenticated = true
  }

  setLoading(v: boolean) {
    this.loading = v
  }
}
