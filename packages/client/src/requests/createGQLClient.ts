import { GraphQLClient, ClientError } from 'graphql-request'

export type GQLRequest<A, R> = {
  args: A
  resp: R
}

export type ClientRequests = Record<string, GQLRequest<any, any>>

class GQLError extends Error {
  code: number

  constructor(obj: { code: number; message: string }) {
    super(obj.message)
    this.code = obj.code
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
    variables: CR[N]['args'],
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
          code: -2,
          message: `Response for ${name.toString()} has no data`,
        })
      }

      return response[name]
    } catch (e) {
      const error = <ClientError>e
      throw new GQLError({
        code: 0,
        message:
          error.response.errors
            ?.map((item) => `msg:${item.message}|path:${(item.path || []).join('->')}`)
            .join('|') || '',
      })
    }
  }

  return request
}

export default createClient
