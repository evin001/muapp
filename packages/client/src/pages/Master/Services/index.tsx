import React from 'react'

import { Button } from '@stage-ui/core'
import { Plus } from '@stage-ui/icons'

import { Page } from '~/components/Page'
import { useTitle } from '~/hooks/useTitle'

export const Services = () => {
  useTitle('Список услуг')

  return (
    <Page
      title="Список услуг"
      titleLeftChild={
        <Button
          label="Добавить"
          textColor="surface"
          leftChild={<Plus color="surface" />}
        />
      }
    >
      Services
    </Page>
  )
}
