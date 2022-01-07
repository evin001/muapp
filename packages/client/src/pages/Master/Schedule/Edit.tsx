import React, { useEffect, useMemo } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import {
  Button,
  Select,
  Flexbox,
  Text,
  DatePicker,
  Grid,
  TextField,
  useTheme,
} from '@stage-ui/core'
import { ArrowLeft } from '@stage-ui/icons'
import moment from 'moment'

import { useMasterContext } from '..'

import { Service, Category } from '~/generated/graphql'
import { font } from '~/theme'
import { useTitle } from '~/hooks/useTitle'
import { useSelector } from '~/hooks/useSelector'
import { EnititiesActions } from '~/data/enitities'
import { selectServicesByParentCategory } from '~/data/enitities/select'
import { Page } from '~/components/Page'
import { HintError } from '~/components/HintError'

const colorSaturation = 500
const colors = [
  { label: 'Оранжевый', color: 'amber' },
  { label: 'Зелёный', color: 'green' },
  { label: 'Фиолетовый', color: 'purple' },
  { label: 'Голубой', color: 'cyan' },
  { label: 'Розовый', color: 'pink' },
  { label: 'Индиго', color: 'indigo' },
  { label: 'Синий', color: 'blue' },
  { label: 'Красный', color: 'red' },
]

export const MasterScheduleEdit = () => {
  const { id } = useParams<{ id?: string }>()
  const title = id ? 'Редактирование расписания' : 'Новое расписание'

  useTitle(title)

  const navigate = useNavigate()
  const { color } = useTheme()
  const { setMenu } = useMasterContext()

  const servicesWithCategories = useSelector(selectServicesByParentCategory)

  useEffect(() => {
    setMenu('schedule')
    EnititiesActions.categoriesFetch()
    EnititiesActions.servicesFetch()
  }, [])

  const colorOptions = colors.map((c) => ({
    text: c.label,
    value: color.palette[`${c.color}${colorSaturation}`].hex(),
  }))

  const repetitionOptions = [
    { text: 'Ежедневно', value: '' },
    { text: `Еженедельно - ${moment().format('dddd')}`, value: '' },
    { text: `Ежемесячно перв. ${moment().format('dddd')}`, value: '' },
    { text: 'Каждый будний день (с понедельника по пятницу)', value: '' },
  ]

  const serviceOptions = useMemo(() => {
    return servicesWithCategories.map((serviceOrCategory) => {
      if ((serviceOrCategory as Service).category) {
        return {
          text: (serviceOrCategory as Service).category.name,
          value: serviceOrCategory?.id.toString() || '',
        }
      }
      return { text: (serviceOrCategory as Category).name, value: 'group' }
    })
  }, [servicesWithCategories.length])

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
      <form>
        <Grid gap="0.25rem">
          <DatePicker
            label="Дата"
            placeholder="Выберите дату"
            format="DD.MM.YYYY"
            hint={<HintError error="" />}
          />
          <Flexbox column>
            <Text size="s" mb="0.25rem">
              Временной интеравал
            </Text>
            <Flexbox alignItems="center">
              <TextField
                placeholder="00:00"
                pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
              />
              <Flexbox
                mx="0.625rem"
                w="1.25rem"
                h="0.0625rem"
                backgroundColor="onBackground"
                borderRadius="0.3125rem"
              />
              <TextField
                placeholder="00:00"
                pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
              />
            </Flexbox>
            <HintError error="" />
          </Flexbox>
          <Select
            clearable
            label="Повторение"
            placeholder="Не повторять"
            options={repetitionOptions}
            hint={<HintError error="" />}
          />
          <Select
            clearable
            label="Услуга"
            placeholder="Любая услуга"
            options={serviceOptions}
            hint={<HintError error="" />}
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
          <Select
            label="Цвет"
            placeholder="Выберите цвет"
            options={colorOptions}
            renderOption={(option) => (
              <Flexbox alignItems="center">
                <Flexbox
                  mr="s"
                  w="2rem"
                  h="1rem"
                  backgroundColor={option.value.toString()}
                  borderRadius="0.3125rem"
                  borderWidth="0.0625rem"
                  borderStyle="solid"
                  borderColor="content3"
                />
                <Text>{option.text}</Text>
              </Flexbox>
            )}
            hint={<HintError error="" />}
          />
        </Grid>
      </form>
    </Page>
  )
}
