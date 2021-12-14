import React from 'react'

import { Button } from '@stage-ui/core'
import { Plus } from '@stage-ui/icons'
import { useNavigate } from 'react-router-dom'

import { Page } from '~/components/Page'
import { useTitle } from '~/hooks/useTitle'

export const Services = () => {
  const navigate = useNavigate()
  useTitle('Список услуг')

  return (
    <Page
      title="Список услуг"
      titleLeftChild={
        <Button
          label="Добавить"
          textColor="surface"
          leftChild={<Plus color="surface" />}
          onClick={() => navigate('edit')}
        />
      }
    >
      Services
    </Page>
  )
}
