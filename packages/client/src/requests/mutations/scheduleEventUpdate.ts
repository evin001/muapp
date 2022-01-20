import { gql } from 'graphql-request'

import { GQLRequest } from '../createGQLClient'

import { Mutation, MutationScheduleEventUpdateArgs } from '~/generated/graphql'

export type ScheduleEventUpdateMutationType = GQLRequest<
  MutationScheduleEventUpdateArgs,
  Mutation['scheduleEventUpdate']
>

export default gql`
  mutation ($input: ScheduleEventCurrent!, $filter: ScheduleEventCurrentFilter!) {
    scheduleEventUpdate(input: $input, filter: $filter)
  }
`
