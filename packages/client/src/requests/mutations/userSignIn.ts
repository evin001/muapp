import { gql } from 'graphql-request'

import { GQLRequest } from '../createGQLClient'

import { Mutation, MutationUserSignInArgs } from '~/generated/graphql'

export type UserSignInMutationType = GQLRequest<
  MutationUserSignInArgs,
  Mutation['userSignIn']
>

export default gql`
  mutation ($email: String!, $password: String!) {
    userSignIn(email: $email, password: $password) {
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
