import { gql } from 'graphql-request'

import { GQLRequest } from '../createGQLClient'

import { Mutation, MutationServiceCreateArgs } from '~/generated/graphql'

export type ServiceCreateMutationType = GQLRequest<
  MutationServiceCreateArgs,
  Mutation['serviceCreate']
>

export default gql`
  mutation ($categoryId: Int!, $duration: Int!, $price: Int!) {
    serviceCreate(categoryId: $categoryId, duration: $duration, price: $price) {
      id
    }
  }
`
