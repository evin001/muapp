import { gql } from 'graphql-request'

import { GQLRequest } from '../createGQLClient'

import { Mutation, MutationCallPasswordArgs } from '~/generated/graphql'

export type CallPasswordMutationType = GQLRequest<
  MutationCallPasswordArgs,
  Mutation['callPassword']
>

export default gql`
  mutation ($phone: String!) {
    callPassword(phone: $phone) {
      success
      type
      time
    }
  }
`
