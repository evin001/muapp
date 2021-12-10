import request from '~/requests/request'

const UserActions = {
  async register(email: string, phone: string, password: string) {
    try {
      const user = await request('userSignUp', { email, phone, password })
      console.log(user)
    } catch (error) {
      console.error(error)
    }
  },
}

export default UserActions
