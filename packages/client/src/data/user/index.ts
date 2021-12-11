import { UserStore } from '../store'

import request from '~/requests/request'

const UserActions = {
  async register(email: string, phone: string, password: string) {
    try {
      UserStore.userFetch()
      const user = await request('userSignUp', { email, phone, password })
      localStorage.setItem('user', JSON.stringify(user))
      UserStore.userResolvle(user)
    } catch (e) {
      const error = <RequestError>e
      UserStore.userReject(error.message)
    }
  },
}

export default UserActions
