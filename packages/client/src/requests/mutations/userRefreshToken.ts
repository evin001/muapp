import { gql } from 'graphql-request'

import { GQLRequest } from '../createGQLClient'

import { Mutation, MutationUserRefreshTokenArgs } from '~/generated/graphql'

export type UserRefreshTokenMutationType = GQLRequest<
  MutationUserRefreshTokenArgs,
  Mutation['userRefreshToken']
>

export default gql`
  mutation ($refreshToken: String!) {
    userRefreshToken(refreshToken: $refreshToken) {
      authToken
      refreshToken
    }
  }
`
