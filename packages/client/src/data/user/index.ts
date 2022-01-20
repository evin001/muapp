import { UserStore } from '../store'

import request from '~/requests/request'
import { UserStorage } from '~/utils/auth'

export const UserActions = {
  async register(email: string, phone: string, password: string) {
    try {
      UserStore.userFetch()
      const user = await request('userSignUp', { email, phone, password })
      UserStorage.set(user)
      UserStore.userResolve(user)
    } catch (e) {
      const error = <RequestError>e
      UserStore.userReject(error.message)
    }
  },

  async auth(email: string, password: string) {
    try {
      UserStore.userFetch()
      const user = await request('userSignIn', { email, password })
      UserStorage.set(user)
      UserStore.userResolve(user)
    } catch (e) {
      const error = <RequestError>e
      UserStore.userReject(error.message)
    }
  },

  async refreshToken() {
    try {
      const user = UserStorage.get()
      if (!user) {
        return
      }
      const tokens = await request('userRefreshToken', {
        refreshToken: user.refreshToken,
      })
      user.authToken = tokens.authToken
      user.refreshToken = tokens.refreshToken
      UserStorage.set(user)
      UserStore.userResolve(user)
    } catch (e) {
      // Do nothing
    }
  },

  init() {
    const user = UserStorage.get()
    if (user) {
      UserStore.userResolve(user)
    }
  },

  logOut() {
    UserStore.userReset()
    UserStorage.reset()
  },
}

export default UserActions
