import React from 'react'

import { Button } from '@stage-ui/core'
import { Plus } from '@stage-ui/icons'
import { useNavigate } from 'react-router-dom'

import { Page } from '~/components/Page'
import { useTitle } from '~/hooks/useTitle'
import { ListPlaceholder } from '~/components/ListPlaceholder'
import { Calendar } from '~/components/Calendar'
import PlaceholderImage from '~/assets/images/casual-life-3d-workspace.png'

export const Schedule = () => {
  useTitle('Расписание')

  const navigate = useNavigate()

  return (
    <Page
      title="Расписание"
      titleLeftChild={
        <Button
          label="Добавить"
          textColor="surface"
          leftChild={<Plus color="surface" />}
          onClick={() => navigate('edit')}
        />
      }
    >
      <Calendar mb="m" />
      <ListPlaceholder
        title="На выбранную дату расписание не составлено"
        image={PlaceholderImage}
      />
    </Page>
  )
}
