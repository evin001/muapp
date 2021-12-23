import { gql } from 'graphql-request'

import { GQLRequest } from '../createGQLClient'

import { Mutation, MutationCategoryCreateArgs } from '~/generated/graphql'

export type CategoryCreateMutationType = GQLRequest<
  MutationCategoryCreateArgs,
  Mutation['categoryCreate']
>

export default gql`
  mutation ($name: String!, $parentId: Int) {
    categoryCreate(name: $name, parentId: $parentId) {
      id
      name
      userId
      parentId
    }
  }
`
