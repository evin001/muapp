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
import { useSelector } from '~/hooks/useSelector'

export const MasterEditService = () => {
  const navigate = useNavigate()
  const { setMenu } = useMasterContext()
  const { categories } = useSelector((state) => ({
    categories: state.entities.categories.data,
  }))
  const { id } = useParams<{ id: string }>()
  const title = id ? 'Редактирование услуги' : 'Добавление услуги'

  useTitle(title)

  useEffect(() => {
    setMenu('services')
    EnititiesActions.categoriesFetch()
  }, [])

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        text: category.name,
        value: category.id,
      })),
    [categories.length],
  )
  console.log({ categories, categoryOptions })
  const handleClickAddCategory = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    dialog({
      title: 'Новая категория',
      render: (close) => <AddCategoryModal onClose={close} />,
    })
  }

  const handleClickAddService = () => {
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
          placeholder="Категория"
          options={categoryOptions}
          rightChild={
            <Link mr="s" onClick={handleClickAddCategory}>
              Добавить
            </Link>
          }
        />
        <TextField
          label="Услуга"
          rightChild={<Link onClick={handleClickAddService}>Добавить</Link>}
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
