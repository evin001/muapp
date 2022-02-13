/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '~/generated/graphql'
import { UserStorage } from '~/utils/auth'

export interface UserState {
  data: User | null
  fetch: LoadingState
  error: string | null
}

export const initialState: UserState = {
  data: UserStorage.get() || null,
  fetch: 'idle',
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userFetch(state) {
      state.fetch = 'pending'
      state.error = null
    },
    userResolve(state, { payload }: PayloadAction<User>) {
      state.fetch = 'resolved'
      state.data = payload
    },
    userReject(state, { payload }: PayloadAction<string>) {
      state.error = payload
      state.fetch = 'rejected'
    },
    userReset(state) {
      state.data = null
      state.error = null
      state.fetch = 'idle'
    },
  },
})

export default userSlice
