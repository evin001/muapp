import { gql } from 'graphql-request'

import { GQLRequest } from '../createGQLClient'

import { Mutation, MutationUserEmailConfirmArgs } from '~/generated/graphql'

export type UserEmailConfirmMutationType = GQLRequest<
  MutationUserEmailConfirmArgs,
  Mutation['userEmailConfirm']
>

export default gql`
  mutation ($email: String!) {
    userEmailConfirm(email: $email)
  }
`
