/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '~/generated/graphql'

export interface UserState {
  data: User | null
  fetch: LoadingState
  error: string | null
}

export const initialState: UserState = {
  data: null,
  fetch: 'idle',
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userFetch(state) {
      state.fetch = 'pending'
      state.data = null
    },
    userResolvle(state, { payload }: PayloadAction<User>) {
      state.fetch = 'resolved'
      state.data = payload
    },
    userReject(state, { payload }: PayloadAction<string>) {
      state.error = payload
      state.fetch = 'rejected'
    },
  },
})

export default userSlice
