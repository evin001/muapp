import { gql } from 'graphql-request'

import { GQLRequest } from '../createGQLClient'

import { Query, QueryScheduleEventArgs } from '~/generated/graphql'

export type ScheduleEventQueryType = GQLRequest<
  QueryScheduleEventArgs,
  Query['scheduleEvent']
>

export default gql`
  query ($id: Int!) {
    scheduleEvent(id: $id) {
      id
      code
      color
      date
      intervalStart
      intervalEnd
      services
      type
      userId
    }
  }
`
