/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ScheduleEvent } from '~/generated/graphql'

type ScheduleState = {
  mutationPending: boolean
  error: string
  events: StoreFetchState<ScheduleEvent[]>
}

const initialState: ScheduleState = {
  mutationPending: false,
  error: '',
  events: {
    fetch: 'idle',
    data: [],
    error: '',
  },
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

    eventsFetch(state) {
      state.events.data = []
      state.events.fetch = 'pending'
      state.events.error = ''
    },
    eventsResolve(state, { payload }: PayloadAction<ScheduleEvent[]>) {
      state.events.fetch = 'resolved'
      state.events.data = payload
    },
    eventsReject(state, { payload }: PayloadAction<string>) {
      state.events.fetch = 'rejected'
      state.events.error = payload
    },
  },
})

export default scheduleSlice
