/* eslint-disable @typescript-eslint/no-unsafe-return */
import { GraphQLClient, ClientError } from 'graphql-request'

import { translate } from './errors'

import UserActions from '~/data/user'

export type GQLRequest<A, R> = {
  args: A
  resp: R
}

export type ClientRequests = Record<string, GQLRequest<any, any>>

class GQLError extends Error {
  constructor(obj: { message: string }) {
    super(translate(obj.message))
    this.name = 'GQLError'
  }
}

const createClient = <CR extends ClientRequests>(
  requests: Record<keyof CR, string>,
  endpoint: string,
  getHeaders?: () => Promise<HeadersInit | undefined>,
) => {
  const request = async <N extends keyof CR>(
    name: N,
    variables?: CR[N]['args'],
  ): Promise<CR[N]['resp']> => {
    try {
      const headers = (await getHeaders?.()) || undefined
      const client = new GraphQLClient(`${endpoint}/graphql`, { headers })
      const response = await client.request<CR[N]['resp'], CR[N]['args']>(
        requests[name],
        variables,
      )

      if (typeof response[name] === undefined) {
        throw new GQLError({
          message: `Response for ${name.toString()} has no data`,
        })
      }

      return response[name]
    } catch (e) {
      const error = <ClientError>e
      const message = error?.response?.errors?.[0].message || error.message // Token is expired

      if (message === 'Token is expired') {
        await UserActions.refreshToken()
        return request(name, variables)
      }

      throw new GQLError({ message })
    }
  }

  return request
}

export default createClient
