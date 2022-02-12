import { gql } from 'graphql-request'

import { GQLRequest } from '../createGQLClient'

import { Mutation, MutationScheduleEventDeleteArgs } from '~/generated/graphql'

export type ScheduleEventDeleteMutationType = GQLRequest<
  MutationScheduleEventDeleteArgs,
  Mutation['scheduleEventDelete']
>

export default gql`
  mutation ($filter: ScheduleEventCurrentFilter!) {
    scheduleEventDelete(filter: $filter)
  }
`
