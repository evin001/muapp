import requests, { Requests } from '.'

import createGQLClient from './createGQLClient'

import { User } from '~/generated/graphql'

const getEndpoint = () => `http://${window.location.hostname}:4000`

export default createGQLClient<Requests>(
  requests,
  getEndpoint(),
  () =>
    new Promise((resolve) => {
      resolve({
        authorization: `Bearer ${
          (localStorage.getItem('user') as unknown as User).authToken || ''
        }`,
      })
    }),
)
