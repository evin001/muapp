import React from 'react'

import { Page } from '~/components/Page'
import { useTitle } from '~/hooks/useTitle'

export const Profile = () => {
  useTitle('Профиль')

  return <Page title="Профиль">Profile</Page>
}
