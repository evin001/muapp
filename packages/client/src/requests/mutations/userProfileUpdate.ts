import { gql } from 'graphql-request'

import { GQLRequest } from '../createGQLClient'

import { Mutation, MutationUserProfileUpdateArgs } from '~/generated/graphql'

export type UserProfileUpdateMutationType = GQLRequest<
  MutationUserProfileUpdateArgs,
  Mutation['userProfileUpdate']
>

export default gql`
  mutation ($email: String!, $phone: String!, $firstName: String!, $lastName: String) {
    userProfileUpdate(
      email: $email
      phone: $phone
      firstName: $firstName
      lastName: $lastName
    ) {
      authToken
      refreshToken
      email
      emailVerified
      firstName
      id
      lastName
      phone
      phoneVerified
      role
    }
  }
`
