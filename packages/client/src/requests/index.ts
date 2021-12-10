import userSignUp, { UserSignUpMutationType } from './mutations/userSignUp'

type Mutations = {
  userSignUp: UserSignUpMutationType
}

const mutations = {
  userSignUp,
}

export type Requests = Mutations

export default {
  ...mutations,
}
