import React from 'react'

import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@stage-ui/core'
import { ArrowLeft } from '@stage-ui/icons'

import { Page } from '~/components/Page'
import { useTitle } from '~/hooks/useTitle'

export const MasterEditService = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const title = id ? 'Редактирование услуги' : 'Добавление услуги'

  useTitle(title)

  return (
    <Page
      title={title}
      titleLeftChild={
        <Button color="lightest" onClick={() => navigate('..')}>
          <ArrowLeft />
        </Button>
      }
    >
      edit page
    </Page>
  )
}
