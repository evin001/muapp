import userSignUp, { UserSignUpMutationType } from './mutations/userSignUp'
import userSignIn, { UserSignInMutationType } from './mutations/userSignIn'
import userRefreshToken, {
  UserRefreshTokenMutationType,
} from './mutations/userRefreshToken'
import userProfileUpdate, {
  UserProfileUpdateMutationType,
} from './mutations/userProfileUpdate'

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
import scheduleEventUpdate, {
  ScheduleEventUpdateMutationType,
} from './mutations/scheduleEventUpdate'
import scheduleEventDelete, {
  ScheduleEventDeleteMutationType,
} from './mutations/scheduleEventDelete'
import scheduleEvent, { ScheduleEventQueryType } from './queries/scheduleEvent'
import scheduleEvents, { ScheduleEventsQueryType } from './queries/scheduleEvents'

type Mutations = {
  // User
  userSignUp: UserSignUpMutationType
  userSignIn: UserSignInMutationType
  userRefreshToken: UserRefreshTokenMutationType
  userProfileUpdate: UserProfileUpdateMutationType

  categoryCreate: CategoryCreateMutationType

  serviceCreate: ServiceCreateMutationType
  serviceUpdate: ServiceUpdateMutationType
  serviceDelete: ServiceDeleteMutationType

  scheduleEventCreate: ScheduleEventCreateMutationType
  scheduleEventUpdate: ScheduleEventUpdateMutationType
  scheduleEventDelete: ScheduleEventDeleteMutationType
}

type Queries = {
  categories: CategoriesQueryType
  service: ServiceQueryType
  services: ServicesQueryType
  scheduleEvent: ScheduleEventQueryType
  scheduleEvents: ScheduleEventsQueryType
}

const mutations = {
  userSignUp,
  userSignIn,
  userRefreshToken,
  userProfileUpdate,

  categoryCreate,

  serviceCreate,
  serviceUpdate,
  serviceDelete,

  scheduleEventCreate,
  scheduleEventUpdate,
  scheduleEventDelete,
}

const queries = {
  categories,
  service,
  services,
  scheduleEvent,
  scheduleEvents,
}

export type Requests = Mutations & Queries

export default {
  ...mutations,
  ...queries,
}
