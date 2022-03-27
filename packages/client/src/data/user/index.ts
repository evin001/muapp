import { UserStore } from '../store'

import request from '~/requests/request'
import { UserStorage } from '~/utils/auth'

import { MutationUserPasswordChangeArgs } from '~/generated/graphql'

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

  async profileUpdate(data: {
    email: string
    phone: string
    firstName?: string
    lastName?: string
  }) {
    try {
      UserStore.userFetch()
      const user = await request('userProfileUpdate', data)
      UserStorage.set(user)
      UserStore.userResolve(user)
    } catch (e) {
      const error = <RequestError>e
      UserStore.userReject(error.message)
    }
  },

  async passwordChange(input: MutationUserPasswordChangeArgs) {
    try {
      const res = await request('userPasswordChange', input)
      return res
    } catch (e) {
      const error = <RequestError>e
      return error.message
    }
  },

  async makeCall(phone: string) {
    try {
      const res = await request('callPassword', { phone })
      return res
    } catch (e) {
      const error = <RequestError>e
      return error.message
    }
  },

  async confirmEmail(email: string) {
    try {
      await request('userEmailConfirm', { email })
    } catch (e) {
      console.log(e)
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
