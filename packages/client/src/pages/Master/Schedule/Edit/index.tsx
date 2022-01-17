import React, { useEffect, useMemo, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import {
  Button,
  Select,
  Flexbox,
  Text,
  DatePicker,
  Grid,
  useTheme,
  dialog,
} from '@stage-ui/core'
import { ArrowLeft, Save, Plus, Close } from '@stage-ui/icons'
import moment from 'moment'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useMasterContext } from '../..'

import { colorOptions, colorSaturation, getRepetitionOptions, schema } from './utils'

import { ScheduleEventType } from '~/generated/graphql'
import { useTitle } from '~/hooks/useTitle'
import { EnititiesActions } from '~/data/enitities'
import { Page } from '~/components/Page'
import { HintError } from '~/components/HintError'
import { TimeField } from '~/components/TimeField'
import { SelectMultipleService } from '~/modals/SelectMultipleService'
import { ScheduleActions } from '~/data/schedule'

type EditFormType = {
  intervalStart: string
  intervalEnd: string
  color: string
  type: ScheduleEventType
  date: Date
  services?: number[]
}

export const MasterScheduleEdit = () => {
  const { id } = useParams<{ id?: string }>()
  const title = id ? 'Редактирование события' : 'Новое событие'

  useTitle(title)

  const navigate = useNavigate()
  const { color } = useTheme()
  const { setMenu } = useMasterContext()

  const {
    handleSubmit,
    control,
    getValues,
    formState: { isValid, errors },
  } = useForm<EditFormType>({
    defaultValues: {
      date: new Date(),
      intervalStart: '09:00',
      intervalEnd: '10:00',
      type: ScheduleEventType.Once,
      color: 'purple',
      services: [],
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })
  const values = getValues()
  const [date, setDate] = useState(values.date)

  useEffect(() => {
    setMenu('schedule')
    EnititiesActions.categoriesFetch()
    EnititiesActions.servicesFetch()
  }, [])

  const repetitionOptions = useMemo(() => getRepetitionOptions(date), [date])

  const handleSave = () => navigate('../')

  const handleSubmitForm = (data: EditFormType) => {
    if (!id) {
      ScheduleActions.eventCreate(
        {
          ...data,
          date: moment(data.date).format('YYYY-MM-DD'),
        },
        handleSave,
      )
    } else {
      // TODO Update event
    }
  }

  return (
    <Page
      title={title}
      titleLeftChild={
        <Button
          color="onPrimary"
          borderColor="onSecondary"
          borderStyle="solid"
          borderWidth="0.0625rem"
          onClick={() => navigate('../schedule')}
        >
          <ArrowLeft color="onBackground" />
        </Button>
      }
    >
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Grid gap="0.25rem">
          <Controller
            name="date"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <DatePicker
                label="Дата"
                placeholder="Выберите дату"
                format="DD.MM.YYYY"
                value={value}
                onChange={(_, d) => {
                  const nextDate = moment(d, 'DD.MM.YYYY').toDate()
                  setDate(nextDate)
                  onChange(nextDate)
                }}
                hint={<HintError error={error?.message} />}
              />
            )}
          />
          <Flexbox column>
            <Text size="s" mb="0.25rem">
              Временной интеравал
            </Text>
            <Grid alignItems="center" templateColumns="1fr 1.25rem 1fr" gap="0.625rem">
              <Controller
                name="intervalStart"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TimeField value={value} onChange={onChange} />
                )}
              />
              <Flexbox
                w="100%"
                h="0.0625rem"
                backgroundColor="onBackground"
                borderRadius="0.3125rem"
              />
              <Controller
                name="intervalEnd"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TimeField value={value} onChange={onChange} />
                )}
              />
            </Grid>
            <HintError
              error={errors.intervalEnd?.message || errors.intervalStart?.message}
            />
          </Flexbox>
          <Controller
            name="type"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Select
                label="Повторение"
                options={repetitionOptions}
                values={repetitionOptions.filter((t) => t.value === value)}
                onChange={(_, option) => {
                  onChange(option?.value)
                }}
                hint={<HintError error={error?.message} />}
              />
            )}
          />
          <Controller
            name="services"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Flexbox mb="1.5rem" justifyContent="space-between">
                <Text>{value?.length ? `Услуги (${value.length})` : 'Любая услуга'}</Text>
                <Flexbox alignItems="center">
                  {(value?.length || 0) > 0 && (
                    <Flexbox
                      mr="s"
                      p="0.125rem"
                      backgroundColor="content1"
                      css={{ borderRadius: '50%' }}
                      onClick={() => onChange([])}
                    >
                      <Close size="s" color="onSecondary" />
                    </Flexbox>
                  )}
                  <Text
                    decoration="underline"
                    color="primary"
                    onClick={() => {
                      dialog({
                        title: 'Выбор услуг',
                        render: (close) => (
                          <SelectMultipleService
                            services={value}
                            onClose={close}
                            onChange={onChange}
                          />
                        ),
                        overrides: {
                          window: () => ({
                            width: '80vw',
                            maxWidth: '20rem',
                          }),
                        },
                      })
                    }}
                  >
                    Выбрать
                  </Text>
                </Flexbox>
              </Flexbox>
            )}
          />
          <Controller
            name="color"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Select
                label="Цвет"
                placeholder="Выберите цвет"
                options={colorOptions}
                values={colorOptions.filter((c) => c.value === value)}
                onChange={(_, option) => {
                  onChange(option?.value)
                }}
                renderOption={(option) => (
                  <Flexbox alignItems="center">
                    <Flexbox
                      mr="s"
                      w="2rem"
                      h="1rem"
                      backgroundColor={color.palette[
                        `${option.value.toString()}${colorSaturation}`
                      ].hex()}
                      borderRadius="0.3125rem"
                      borderWidth="0.0625rem"
                      borderStyle="solid"
                      borderColor="content3"
                    />
                    <Text>{option.text}</Text>
                  </Flexbox>
                )}
                hint={<HintError error={error?.message} />}
              />
            )}
          />

          <Button textColor="surface" type="submit" disabled={!isValid}>
            {id ? <Save /> : <Plus />}
            <Text pl="s">{id ? 'Сохранить' : 'Добавить'}</Text>
          </Button>
        </Grid>
      </form>
    </Page>
  )
}

export default MasterScheduleEdit
