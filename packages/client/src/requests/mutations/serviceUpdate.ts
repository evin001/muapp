import { gql } from 'graphql-request'

import { GQLRequest } from '../createGQLClient'

import { Mutation, MutationServiceUpdateArgs } from '~/generated/graphql'

export type ServiceUpdateMutationType = GQLRequest<
  MutationServiceUpdateArgs,
  Mutation['serviceUpdate']
>

export default gql`
  mutation ($serviceId: Int!, $duration: Int!, $price: Int!) {
    serviceUpdate(serviceId: $serviceId, duration: $duration, price: $price) {
      id
    }
  }
`
