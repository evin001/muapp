import React, { useEffect, useMemo, useState } from 'react'

import { Button, Flexbox, Spinner, Text, Grid, useTheme } from '@stage-ui/core'
import { Plus, Trash } from '@stage-ui/icons'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import { Page } from '~/components/Page'
import { useTitle } from '~/hooks/useTitle'
import { useSelector } from '~/hooks/useSelector'
import { ScheduleActions } from '~/data/schedule'
import { ListPlaceholder } from '~/components/ListPlaceholder'
import { Calendar } from '~/components/Calendar'
import { FORMAT_DATE, STORAGE_EVENTS_FILTER, EventsFilter } from '~/utils/formats'
import { font } from '~/theme'
import PlaceholderImage from '~/assets/images/casual-life-3d-workspace.png'

export const Schedule = () => {
  useTitle('Расписание')

  const navigate = useNavigate()
  const { color } = useTheme()
  const { events, loading, userId } = useSelector((state) => ({
    userId: state.user.data?.id,
    events: state.schedule.events.data,
    loading:
      state.schedule.events.fetch === 'idle' || state.schedule.events.fetch === 'pending',
  }))

  const storageFilter = localStorage.getItem(STORAGE_EVENTS_FILTER)
  const [filter, setFilter] = useState<EventsFilter>(
    storageFilter
      ? (JSON.parse(storageFilter) as EventsFilter)
      : {
          fromDate: '',
          toDate: '',
          day: '',
        },
  )

  useEffect(() => {
    if (userId && filter.fromDate && filter.toDate) {
      ScheduleActions.eventsFetch(+userId, {
        fromDate: filter.fromDate,
        toDate: filter.toDate,
      })
    }
  }, [filter.fromDate, filter.toDate])

  const handleChangeDay = (day: Date) => {
    const fromDate = moment(day).startOf('weeks')
    const toDate = moment(day).endOf('weeks')
    const nextFilter = {
      fromDate: fromDate.format(FORMAT_DATE),
      toDate: toDate.format(FORMAT_DATE),
      day: moment(day).format(FORMAT_DATE),
    }
    setFilter(nextFilter)
    localStorage.setItem(STORAGE_EVENTS_FILTER, JSON.stringify(nextFilter))
  }

  const eventsToShow = useMemo(
    () => events.filter((event) => event.date === filter.day),
    [filter.day, events.length],
  )

  const handleClickAdd = () => {
    navigate('edit')
  }

  const handleClickEvent = (eventId: number) => () => {
    navigate(`edit/${eventId}`)
  }

  return (
    <Page
      title="Расписание"
      titleLeftChild={
        <Button
          label="Добавить"
          textColor="surface"
          leftChild={<Plus color="surface" />}
          onClick={handleClickAdd}
        />
      }
    >
      <Calendar
        mb="m"
        day={filter.day ? moment(filter.day, FORMAT_DATE).toDate() : undefined}
        onChange={handleChangeDay}
      />
      {loading && (
        <Flexbox alignItems="center" justifyContent="center" h="7rem">
          <Spinner /> <Text ml="s">Загрузка событий</Text>
        </Flexbox>
      )}
      <Grid gap="0.75rem">
        {eventsToShow.map((event) => (
          <Flexbox
            key={event.id}
            h="2.5rem"
            alignItems="center"
            borderRadius="0.3125rem"
            backgroundColor={event.color ? color.palette[`${event.color}100`] : 'surface'}
            onClick={handleClickEvent(event.id)}
          >
            <Flexbox
              mr="s"
              h="100%"
              w="0.375rem"
              borderRadius="0.3125rem"
              backgroundColor={
                event.color ? color.palette[`${event.color}500`] : 'surface'
              }
            />
            <Text
              size="m"
              flex={1}
              color={event.color ? color.palette[`${event.color}500`] : 'onBackground'}
              css={{ fontFamily: font.medium }}
            >
              {event.intervalStart} - {event.intervalEnd}
            </Text>
            <Trash
              px="m"
              size="m"
              color={event.color ? color.palette[`${event.color}500`] : 'onBackground'}
            />
          </Flexbox>
        ))}
      </Grid>
      {!loading && !eventsToShow.length && (
        <ListPlaceholder
          title="На выбранную дату расписание не составлено"
          image={PlaceholderImage}
        />
      )}
    </Page>
  )
}
