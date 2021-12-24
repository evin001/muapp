import React, { useEffect, useMemo } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
import { Grid, Button, TextField, Text, Link, Select, dialog } from '@stage-ui/core'
import { ArrowLeft, Plus, Save } from '@stage-ui/icons'

import { useMasterContext } from '..'

import { Page } from '~/components/Page'
import { useTitle } from '~/hooks/useTitle'
import { AddCategoryModal } from '~/modals/AddCategoryModal'
import { AddServiceModal } from '~/modals/AddServiceModal'
import { EnititiesActions } from '~/data/enitities'
import {
  selectCategoriesWithParent,
  selectCategoriesWithFreeChild,
} from '~/data/enitities/select'
import { useSelector } from '~/hooks/useSelector'

export const MasterEditService = () => {
  const navigate = useNavigate()
  const { setMenu } = useMasterContext()
  const { id } = useParams<{ id: string }>()
  const title = id ? 'Редактирование услуги' : 'Добавление услуги'

  useTitle(title)

  useEffect(() => {
    setMenu('services')
    EnititiesActions.categoriesFetch()
  }, [])

  const categories = useSelector(selectCategoriesWithParent)
  const services = useSelector(selectCategoriesWithFreeChild)

  const categoryOptions = useMemo(
    () => categories.map((c) => ({ text: c.name, value: c.id })),
    [categories.length],
  )
  const serviceOptions = useMemo(
    () => services.map((s) => ({ text: s.name, value: s.id })),
    [services.length],
  )

  const handleClickAddCategory = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    dialog({
      title: 'Новая категория',
      render: (close) => <AddCategoryModal onClose={close} />,
    })
  }

  const handleClickAddService = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    dialog({
      title: 'Новая услуга',
      render: (close) => <AddServiceModal onClose={close} />,
    })
  }

  return (
    <Page
      title={title}
      titleLeftChild={
        <Button color="lightest" onClick={() => navigate('..')}>
          <ArrowLeft />
        </Button>
      }
    >
      <Grid gap="1rem">
        <Select
          clearable
          label="Категория"
          placeholder="Выберите категорию"
          options={categoryOptions}
          rightChild={
            <Link mr="s" onClick={handleClickAddCategory}>
              Добавить
            </Link>
          }
        />
        <Select
          label="Услуга"
          placeholder="Выберите услугу"
          options={serviceOptions}
          rightChild={
            <Link mr="s" onClick={handleClickAddService}>
              Добавить
            </Link>
          }
        />
        <Grid templateColumns="1fr 1fr" gap="1rem">
          <TextField label="Длительность" rightChild={<Text>мин</Text>} />
          <TextField label="Стоимость" rightChild={<Text>₽</Text>} />
        </Grid>
        <Button
          mt="m"
          textColor="surface"
          label={id ? 'Сохранить' : 'Добавить'}
          leftChild={id ? <Save /> : <Plus />}
        />
      </Grid>
    </Page>
  )
}
