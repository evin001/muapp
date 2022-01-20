import { ScheduleStore } from '../store'

import {
  ScheduleEventNew,
  ScheduleEventCurrent,
  ScheduleEventCurrentFilter,
} from '~/generated/graphql'
import request from '~/requests/request'
import notify from '~/utils/notify'

export const ScheduleActions = {
  async eventCreate(input: ScheduleEventNew, callback?: () => void) {
    try {
      ScheduleStore.mutationPending(true)
      await request('scheduleEventCreate', { input })
      callback?.()
    } catch (e) {
      const error = <RequestError>e
      notify('Создание события', error.message, 'error')
    } finally {
      ScheduleStore.mutationPending(false)
    }
  },

  async eventUpdate(
    input: ScheduleEventCurrent,
    filter: ScheduleEventCurrentFilter,
    callback?: () => void,
  ) {
    try {
      ScheduleStore.mutationPending(true)
      await request('scheduleEventUpdate', { input, filter })
      callback?.()
    } catch (e) {
      const error = <RequestError>e
      notify('Обновление события', error.message, 'error')
    } finally {
      ScheduleStore.mutationPending(false)
    }
  },

  async eventFetch(id: number) {
    try {
      ScheduleStore.mutationPending(true)
      const event = await request('scheduleEvent', { id })
      return event
    } catch (e) {
      const error = <RequestError>e
      ScheduleStore.mutationReject(error.message)
    } finally {
      ScheduleStore.mutationPending(false)
    }
  },
}
