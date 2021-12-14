import React, { useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@stage-ui/core'
import { ArrowLeft } from '@stage-ui/icons'

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
      edit page
    </Page>
  )
}
