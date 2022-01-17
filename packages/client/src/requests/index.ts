import userSignUp, { UserSignUpMutationType } from './mutations/userSignUp'
import userSignIn, { UserSignInMutationType } from './mutations/userSignIn'
import userRefreshToken, {
  UserRefreshTokenMutationType,
} from './mutations/userRefreshToken'

import categoryCreate, { CategoryCreateMutationType } from './mutations/categoryCreate'
import categories, { CategoriesQueryType } from './queries/categories'

import serviceCreate, { ServiceCreateMutationType } from './mutations/serviceCreate'
import serviceUpdate, { ServiceUpdateMutationType } from './mutations/serviceUpdate'
import serviceDelete, { ServiceDeleteMutationType } from './mutations/serviceDelete'
import service, { ServiceQueryType } from './queries/service'
import services, { ServicesQueryType } from './queries/services'

import scheduleEventCreate, {
  ScheduleEventCreateMutationType,
} from './mutations/scheduleEventCreate'
import scheduleEvent, { ScheduleEventQueryType } from './queries/scheduleEvent'

type Mutations = {
  // User
  userSignUp: UserSignUpMutationType
  userSignIn: UserSignInMutationType
  userRefreshToken: UserRefreshTokenMutationType

  categoryCreate: CategoryCreateMutationType

  serviceCreate: ServiceCreateMutationType
  serviceUpdate: ServiceUpdateMutationType
  serviceDelete: ServiceDeleteMutationType

  scheduleEventCreate: ScheduleEventCreateMutationType
}

type Queries = {
  categories: CategoriesQueryType
  service: ServiceQueryType
  services: ServicesQueryType
  scheduleEvent: ScheduleEventQueryType
}

const mutations = {
  userSignUp,
  userSignIn,
  userRefreshToken,

  categoryCreate,

  serviceCreate,
  serviceUpdate,
  serviceDelete,

  scheduleEventCreate,
}

const queries = {
  categories,
  service,
  services,
  scheduleEvent,
}

export type Requests = Mutations & Queries

export default {
  ...mutations,
  ...queries,
}
