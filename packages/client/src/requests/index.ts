import userSignUp, { UserSignUpMutationType } from './mutations/userSignUp'
import userSignIn, { UserSignInMutationType } from './mutations/userSignIn'
import userRefreshToken, {
  UserRefreshTokenMutationType,
} from './mutations/userRefreshToken'
import categoryCreate, { CategoryCreateMutationType } from './mutations/categoryCreate'

type Mutations = {
  userSignUp: UserSignUpMutationType
  userSignIn: UserSignInMutationType
  userRefreshToken: UserRefreshTokenMutationType
  categoryCreate: CategoryCreateMutationType
}

const mutations = {
  userSignUp,
  userSignIn,
  userRefreshToken,
  categoryCreate,
}

export type Requests = Mutations

export default {
  ...mutations,
}
