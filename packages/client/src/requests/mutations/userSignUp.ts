import { gql } from 'graphql-request'

import { GQLRequest } from '../createGQLClient'

import { Mutation, MutationUserSignUpArgs } from '~/generated/graphql'

export type UserSignUpMutationType = GQLRequest<
  MutationUserSignUpArgs,
  Mutation['userSignUp']
>

export default gql`
  mutation ($email: String!, $phone: String!, $password: String!) {
    userSignUp(email: $email, phone: $phone, password: $password) {
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
