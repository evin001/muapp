import { gql } from 'graphql-request'

import { GQLRequest } from '../createGQLClient'

import { Mutation, MutationServiceDeleteArgs } from '~/generated/graphql'

export type ServiceDeleteMutationType = GQLRequest<
  MutationServiceDeleteArgs,
  Mutation['serviceDelete']
>

export default gql`
  mutation ($serviceId: Int!) {
    serviceCreate(serviceId: $serviceId)
  }
`
