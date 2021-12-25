import { gql } from 'graphql-request'

import { GQLRequest } from '../createGQLClient'

import { Query, QueryServicesArgs } from '~/generated/graphql'

export type ServicesQueryType = GQLRequest<QueryServicesArgs, Query['services']>

export default gql`
  query ($userId: Int!) {
    services(userId: $userId) {
      id
      duration
      price
      userId
      category {
        id
        name
        userId
        parentId
        type
      }
    }
  }
`
