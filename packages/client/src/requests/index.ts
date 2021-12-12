import userSignUp, { UserSignUpMutationType } from './mutations/userSignUp'
import userSignIn, { UserSignInMutationType } from './mutations/userSignIn'
import userRefreshToken, {
  UserRefreshTokenMutationType,
} from './mutations/userRefreshToken'

type Mutations = {
  userSignUp: UserSignUpMutationType
  userSignIn: UserSignInMutationType
  userRefreshToken: UserRefreshTokenMutationType
}

const mutations = {
  userSignUp,
  userSignIn,
  userRefreshToken,
}

export type Requests = Mutations

export default {
  ...mutations,
}
