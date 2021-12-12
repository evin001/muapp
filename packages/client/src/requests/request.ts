import requests, { Requests } from '.'

import createGQLClient from './createGQLClient'

import { UserStorage } from '~/utils/auth'

const getEndpoint = () => `http://${window.location.hostname}:4000`

export default createGQLClient<Requests>(
  requests,
  getEndpoint(),
  () =>
    new Promise((resolve) => {
      const headers = []
      const user = UserStorage.get()

      if (user?.authToken) {
        headers.push(['authorization', `Bearer ${user?.authToken}`])
      }

      resolve(Object.fromEntries(headers) as HeadersInit)
    }),
)
