/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ScheduleState = {
  mutationPending: boolean
  error: string
}

const initialState: ScheduleState = {
  mutationPending: false,
  error: '',
}

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
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

export default scheduleSlice
