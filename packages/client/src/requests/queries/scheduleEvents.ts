import { gql } from 'graphql-request'

import { GQLRequest } from '../createGQLClient'

import { Query, QueryScheduleEventsArgs } from '~/generated/graphql'

export type ScheduleEventsQueryType = GQLRequest<
  QueryScheduleEventsArgs,
  Query['scheduleEvents']
>

export default gql`
  query ($userId: Int!, $filter: ScheduleEventsFilter!) {
    scheduleEvents(userId: $userId, filter: $filter) {
      id
      code
      color
      date
      intervalStart
      intervalEnd
      type
    }
  }
`
