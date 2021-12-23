import { gql } from 'graphql-request'

import { GQLRequest } from '../createGQLClient'

import { Query } from '~/generated/graphql'

export type CategoriesQueryType = GQLRequest<void, Query['categories']>

export default gql`
  query {
    categories {
      id
      name
      userId
      parentId
    }
  }
`
