import React, { useEffect, useMemo } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { Button, Select, Flexbox, Text, DatePicker, Grid, useTheme } from '@stage-ui/core'
import SelectTypes from '@stage-ui/core/control/Select/types'
import { ArrowLeft, Save, Plus } from '@stage-ui/icons'
import moment from 'moment'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useMasterContext } from '..'

import { Service, Category, ScheduleEventType } from '~/generated/graphql'
import { font } from '~/theme'
import { useTitle } from '~/hooks/useTitle'
import { useSelector } from '~/hooks/useSelector'
import { EnititiesActions } from '~/data/enitities'
import { selectServicesByParentCategory } from '~/data/enitities/select'
import { Page } from '~/components/Page'
import { HintError } from '~/components/HintError'
import { TimeField, TIME_FORMAT } from '~/components/TimeField'

type EditFormType = {
  intervalStart: string
  intervalEnd: string
  color: string
  type: ScheduleEventType
  date: Date
  services?: string[]
}

const colorSaturation = 500
const colorOptions = [
  { text: 'Оранжевый', value: 'amber' },
  { text: 'Зелёный', value: 'green' },
  { text: 'Фиолетовый', value: 'purple' },
  { text: 'Голубой', value: 'cyan' },
  { text: 'Розовый', value: 'pink' },
  { text: 'Индиго', value: 'indigo' },
  { text: 'Синий', value: 'blue' },
  { text: 'Красный', value: 'red' },
]

const schema = yup.object({
  date: yup.string().required('Пожалуйста, укажите дату'),
  intervalStart: yup
    .string()
    .required('Пожалуйста, временной интервал')
    .matches(TIME_FORMAT, 'Пожалуйста, введите корректное время'),
  intervalEnd: yup
    .string()
    .required('Пожалуйста, временной интервал')
    .matches(TIME_FORMAT, 'Пожалуйста, введите корректное время')
    .test('time', 'Пожалуйста, введите корректный интервал', function (value) {
      return !!value && this.parent.intervalStart < value
    }),
  color: yup.string().required('Пожалуйста, укажите цвет'),
  type: yup.string().required('Пожалуйста, укажите повторение'),
})

export const MasterScheduleEdit = () => {
  const { id } = useParams<{ id?: string }>()
  const title = id ? 'Редактирование события' : 'Новое событие'

  useTitle(title)

  const navigate = useNavigate()
  const { color } = useTheme()
  const { setMenu } = useMasterContext()

  const servicesWithCategories = useSelector(selectServicesByParentCategory)

  const {
    handleSubmit,
    control,
    formState: { isValid },
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

  useEffect(() => {
    setMenu('schedule')
    EnititiesActions.categoriesFetch()
    EnititiesActions.servicesFetch()
  }, [])
  const repetitionOptions: SelectTypes.Option<ScheduleEventType>[] = [
    { text: 'Не повторять', value: ScheduleEventType.Once },
    { text: 'Ежедневно', value: ScheduleEventType.Daily },
    { text: `Еженедельно - ${moment().format('dddd')}`, value: ScheduleEventType.Weekly },
    {
      text: `Ежемесячно перв. ${moment().format('dddd')}`,
      value: ScheduleEventType.Monthly,
    },
    {
      text: 'Каждый будний день (с понедельника по пятницу)',
      value: ScheduleEventType.Weekday,
    },
  ]

  const serviceOptions = useMemo(() => {
    return servicesWithCategories.map((serviceOrCategory) => {
      if (!serviceOrCategory) return { text: '', value: '' }
      if ((serviceOrCategory as Service).category) {
        return {
          text: (serviceOrCategory as Service).category.name,
          value: serviceOrCategory?.id.toString() || '',
        }
      }
      return { text: (serviceOrCategory as Category).name, value: 'group' }
    })
  }, [servicesWithCategories.length])

  const handleSubmitForm = (data: EditFormType) => {}

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
                onChange={(_, date) => {
                  onChange(date)
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
            <HintError error="" />
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
              <Select
                multiselect
                label="Услуга"
                placeholder="Любая услуга"
                options={serviceOptions}
                values={serviceOptions.filter((s) => value?.includes(s.value))}
                hint={<HintError error={error?.message} />}
                onChange={(_, option) => {
                  if (option?.value && option?.value !== 'group') {
                    if (value?.includes(option.value.toString())) {
                      onChange(value.filter((v) => v !== option.value))
                    } else {
                      onChange(value?.concat(option.value.toString()))
                    }
                  }
                }}
                renderOption={(option) => (
                  <Flexbox>
                    {option.value === 'group' ? (
                      <Text css={{ fontFamily: font.medium }}>{option.text}</Text>
                    ) : (
                      <Text ml="m">{option.text}</Text>
                    )}
                  </Flexbox>
                )}
              />
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

          <Button
            textColor="surface"
            label={id ? 'Сохранить' : 'Добавить'}
            leftChild={id ? <Save /> : <Plus />}
            type="submit"
            disabled={!isValid}
          />
        </Grid>
      </form>
    </Page>
  )
}

export default MasterScheduleEdit
