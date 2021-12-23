import userSignUp, { UserSignUpMutationType } from './mutations/userSignUp'
import userSignIn, { UserSignInMutationType } from './mutations/userSignIn'
import userRefreshToken, {
  UserRefreshTokenMutationType,
} from './mutations/userRefreshToken'
import categoryCreate, { CategoryCreateMutationType } from './mutations/categoryCreate'

import categories, { CategoriesQueryType } from './queries/categories'

type Mutations = {
  userSignUp: UserSignUpMutationType
  userSignIn: UserSignInMutationType
  userRefreshToken: UserRefreshTokenMutationType
  categoryCreate: CategoryCreateMutationType
}

type Queries = {
  categories: CategoriesQueryType
}

const mutations = {
  userSignUp,
  userSignIn,
  userRefreshToken,
  categoryCreate,
}

const queries = {
  categories,
}

export type Requests = Mutations & Queries

export default {
  ...mutations,
  ...queries,
}
