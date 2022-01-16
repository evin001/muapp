import { gql } from 'graphql-request'

import { GQLRequest } from '../createGQLClient'

import { Mutation, MutationScheduleEventCreateArgs } from '~/generated/graphql'

export type ScheduleEventCreateMutationType = GQLRequest<
  MutationScheduleEventCreateArgs,
  Mutation['scheduleEventCreate']
>

export default gql`
  mutation (input: ScheduleEventInput!) {
    scheduleEventCreate(input: $input) {
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
