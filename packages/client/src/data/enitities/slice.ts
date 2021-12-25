/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Category, Service } from '~/generated/graphql'

export interface EntitiesState {
  mutationPending: boolean
  error: string
  categories: StoreFetchState<Category[]>
  services: StoreFetchState<Service[]>
}

export const initialState: EntitiesState = {
  mutationPending: false,
  error: '',
  categories: {
    data: [],
    fetch: 'idle',
    error: '',
  },
  services: {
    data: [],
    fetch: 'idle',
    error: '',
  },
}

const entitiesSlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
    categoriesFetch(state) {
      state.categories.fetch = 'pending'
      state.categories.error = ''
    },
    categoriesResolve(state, { payload }: PayloadAction<Category[]>) {
      state.categories.fetch = 'resolved'
      state.categories.data = payload
    },
    categoriesReject(state, { payload }: PayloadAction<string>) {
      state.categories.fetch = 'rejected'
      state.categories.error = payload
    },

    servicesFetch(state) {
      state.services.fetch = 'pending'
      state.services.error = ''
    },
    servicesResolve(state, { payload }: PayloadAction<Service[]>) {
      state.services.fetch = 'resolved'
      state.services.data = payload
    },
    servicesReject(state, { payload }: PayloadAction<string>) {
      state.services.fetch = 'rejected'
      state.services.error = payload
    },

    mutationPending(state, { payload }: PayloadAction<boolean>) {
      state.error = ''
      state.mutationPending = payload
    },
    mutationReject(state, { payload }: PayloadAction<string>) {
      state.error = payload
      state.mutationPending = false
    },
  },
})

export default entitiesSlice
