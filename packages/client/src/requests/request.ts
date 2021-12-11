import requests, { Requests } from '.'

import createGQLClient from './createGQLClient'

import { User } from '~/generated/graphql'

const getEndpoint = () => `http://${window.location.hostname}:4000`

export default createGQLClient<Requests>(
  requests,
  getEndpoint(),
  () =>
    new Promise((resolve) => {
      const headers = []

      const storageUser = localStorage.getItem('user')
      const user = storageUser ? (JSON.parse(storageUser) as User) : null

      if (user?.authToken) {
        headers.push(['authorization', `Bearer ${user?.authToken}`])
      }

      resolve(Object.fromEntries(headers) as HeadersInit)
    }),
)
