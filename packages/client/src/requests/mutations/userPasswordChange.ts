import { gql } from 'graphql-request'

import { GQLRequest } from '../createGQLClient'

import { Mutation, MutationUserPasswordChangeArgs } from '~/generated/graphql'

export type UserPasswordChangeMutationType = GQLRequest<
  MutationUserPasswordChangeArgs,
  Mutation['userPasswordChange']
>

export default gql`
  mutation ($oldPassword: String!, $newPassword: String!, $confirmPassword: String!) {
    userPasswordChange(
      oldPassword: $oldPassword
      newPassword: $newPassword
      confirmPassword: $confirmPassword
    )
  }
`
