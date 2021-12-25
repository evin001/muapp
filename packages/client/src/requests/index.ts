import userSignUp, { UserSignUpMutationType } from './mutations/userSignUp'
import userSignIn, { UserSignInMutationType } from './mutations/userSignIn'
import userRefreshToken, {
  UserRefreshTokenMutationType,
} from './mutations/userRefreshToken'

import categoryCreate, { CategoryCreateMutationType } from './mutations/categoryCreate'
import categories, { CategoriesQueryType } from './queries/categories'

import serviceUpdate, { ServiceUpdateMutationType } from './mutations/serviceUpdate'
import serviceCreate, { ServiceCreateMutationType } from './mutations/serviceCreate'
import service, { ServiceQueryType } from './queries/service'

type Mutations = {
  // User
  userSignUp: UserSignUpMutationType
  userSignIn: UserSignInMutationType
  userRefreshToken: UserRefreshTokenMutationType

  categoryCreate: CategoryCreateMutationType

  serviceCreate: ServiceCreateMutationType
  serviceUpdate: ServiceUpdateMutationType
}

type Queries = {
  categories: CategoriesQueryType
  service: ServiceQueryType
}

const mutations = {
  userSignUp,
  userSignIn,
  userRefreshToken,

  categoryCreate,

  serviceCreate,
  serviceUpdate,
}

const queries = {
  categories,
  service,
}

export type Requests = Mutations & Queries

export default {
  ...mutations,
  ...queries,
}
