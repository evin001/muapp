import React, { useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
import { Grid, Button, TextField, Text, Link } from '@stage-ui/core'
import { ArrowLeft, Plus, Save } from '@stage-ui/icons'

import { useMasterContext } from '..'

import { Page } from '~/components/Page'
import { useTitle } from '~/hooks/useTitle'

export const MasterEditService = () => {
  const navigate = useNavigate()
  const { setMenu } = useMasterContext()
  const { id } = useParams<{ id: string }>()
  const title = id ? 'Редактирование услуги' : 'Добавление услуги'

  useTitle(title)

  useEffect(() => {
    setMenu('services')
  }, [])

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
        <TextField label="Услуга" rightChild={<Link>Выбрать</Link>} />
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
