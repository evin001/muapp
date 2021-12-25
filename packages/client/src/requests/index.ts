import userSignUp, { UserSignUpMutationType } from './mutations/userSignUp'
import userSignIn, { UserSignInMutationType } from './mutations/userSignIn'
import userRefreshToken, {
  UserRefreshTokenMutationType,
} from './mutations/userRefreshToken'

import categoryCreate, { CategoryCreateMutationType } from './mutations/categoryCreate'
import categories, { CategoriesQueryType } from './queries/categories'

import serviceCreate, { ServiceCreateMutationType } from './mutations/serviceCreate'

type Mutations = {
  // User
  userSignUp: UserSignUpMutationType
  userSignIn: UserSignInMutationType
  userRefreshToken: UserRefreshTokenMutationType

  categoryCreate: CategoryCreateMutationType

  serviceCreate: ServiceCreateMutationType
}

type Queries = {
  categories: CategoriesQueryType
}

const mutations = {
  userSignUp,
  userSignIn,
  userRefreshToken,

  categoryCreate,

  serviceCreate,
}

const queries = {
  categories,
}

export type Requests = Mutations & Queries

export default {
  ...mutations,
  ...queries,
}
