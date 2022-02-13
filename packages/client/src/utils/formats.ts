export const FORMAT_DATE = 'YYYY-MM-DD'
export const FORMAT_PHONE = /^\+[1-9]\d{1,14}$/

export const STORAGE_EVENTS_FILTER = 'schedule-events-filter'

export type EventsFilter = {
  fromDate: string
  toDate: string
  day: string
}
