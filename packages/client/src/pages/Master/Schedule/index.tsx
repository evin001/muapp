import React from 'react'

import { Page } from '~/components/Page'
import { useTitle } from '~/hooks/useTitle'

export const Schedule = () => {
  useTitle('Расписание')

  return <Page title="Расписание">Schedule</Page>
}
