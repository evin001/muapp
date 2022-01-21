import React, { useState, useEffect } from 'react'

import { Grid, Flexbox, Text, useTheme } from '@stage-ui/core'
import FlexboxTypes from '@stage-ui/core/layout/Flexbox/types'
import { ArrowIosLeft, ArrowIosRight } from '@stage-ui/icons'
import moment from 'moment'

import { upperFirst } from '~/utils/strings'
import { font } from '~/theme'

type CalendarProps = {
  day?: Date
  onChange?: (day: Date) => void
} & FlexboxTypes.Props

export const Calendar = ({ day, onChange, ...flexboxProps }: CalendarProps) => {
  const { color } = useTheme()
  const [selectDay, setSelectDay] = useState(moment(day))

  useEffect(() => {
    onChange?.(moment(selectDay).toDate())
  }, [selectDay])

  const handleClickNextWeek = () => {
    const nextSelectDay = moment(selectDay).add(1, 'week')
    setSelectDay(nextSelectDay)
  }

  const handleClickPrevWeek = () => {
    const nextSelectDay = moment(selectDay).subtract(1, 'week')
    setSelectDay(nextSelectDay)
  }

  const handleClickToday = () => {
    setSelectDay(moment())
  }

  return (
    <Flexbox column p="0.5rem 0.75rem" backgroundColor="onPrimary" {...flexboxProps}>
      <Flexbox mb="s" justifyContent="space-between">
        <Flexbox alignItems="center">
          <ArrowIosLeft size="m" color="onSecondary" onClick={handleClickPrevWeek} />
          <Text mx="0.125rem" color="onSecondary" css={{ fontFamily: font.medium }}>
            {upperFirst(selectDay.format('MMMM, YYYY'))}
          </Text>
          <ArrowIosRight size="m" onClick={handleClickNextWeek} />
        </Flexbox>
        <Text onClick={handleClickToday} css={{ fontFamily: font.medium }}>
          Сегодня
        </Text>
      </Flexbox>

      <Grid gap="0.375rem" templateColumns="repeat(7, 1fr)">
        {Array(7)
          .fill('')
          .map((_, index) => {
            const weekDay = moment(selectDay).startOf('weeks').add(index, 'days')
            const isSelect = weekDay.format('D') === selectDay.format('D')

            return (
              <Flexbox
                key={weekDay.format()}
                column
                h="2.75rem"
                borderRadius="0.3125rem"
                alignItems="center"
                justifyContent="center"
                onClick={() => {
                  setSelectDay(weekDay)
                }}
                backgroundColor="onPrimary"
                css={[
                  { transition: 'background-color .2s ease' },
                  isSelect && {
                    backgroundColor: color.palette.accent1.hex(),
                    fontFamily: font.medium,
                  },
                ]}
              >
                <Text
                  css={[
                    { transition: 'color .2s ease', color: color.palette.content3.hex() },
                    isSelect && {
                      color: color.palette.content2.hex(),
                      fontFamily: font.medium,
                    },
                  ]}
                >
                  {weekDay.format('dd')}
                </Text>
                <Text
                  css={[
                    {
                      transition: 'color .2s ease',
                      color: color.onBackground.hex(),
                    },
                    isSelect && { color: color.surface.hex() },
                  ]}
                >
                  {weekDay.format('D')}
                </Text>
              </Flexbox>
            )
          })}
      </Grid>
    </Flexbox>
  )
}
