import { gql } from 'graphql-request'

import { GQLRequest } from '../createGQLClient'

import { Query, QueryServiceArgs } from '~/generated/graphql'

export type ServiceQueryType = GQLRequest<QueryServiceArgs, Query['service']>

export default gql`
  query ($id: Int!) {
    service(id: $id) {
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
