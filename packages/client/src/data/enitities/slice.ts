/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Category } from '~/generated/graphql'

export interface EntitiesState {
  categories: {
    data: Category[]
    fetch: LoadingState
    error: string
  }
}

export const initialState: EntitiesState = {
  categories: {
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
      state.categories.data = state.categories.data.concat(...payload)
    },
    categoriesReject(state, { payload }: PayloadAction<string>) {
      state.categories.fetch = 'rejected'
      state.categories.error = payload
    },
  },
})

export default entitiesSlice
