import React, { useState } from 'react'

import { Grid, TextField, Button, Block, Link } from '@stage-ui/core'

import { Page } from '~/components/Page'
import { useTitle } from '~/hooks/useTitle'
import { useSelector } from '~/hooks/useSelector'

export const Profile = () => {
  useTitle('Профиль')

  const data = useSelector((state) => state.user.data)
  const [user, setUser] = useState({
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    email: data?.email || '',
    phone: data?.phone || '',
  })

  const handleChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value.trim() })
  }

  const handleClickSave = () => {
    console.log('[handleClickSave]: not implemented yet')
  }

  const handleClickChangePassword = () => {
    console.log('[handleClickChangePassword]: not implemented yet')
  }

  const handleClickVerifyEmail = () => {
    console.log('[handleClickVerifyEmail]: not implemented yet')
  }

  const handleClickVerifyPhone = () => {
    console.log('[handleClickVerifyPhone]: not implemented yet')
  }

  return (
    <Page title="Профиль">
      <Grid gap="1rem">
        <TextField
          label="Имя"
          name="firstName"
          value={user.firstName}
          onChange={handleChangeTextField}
        />
        <TextField
          label="Фамилия"
          name="lastName"
          value={user.lastName}
          onChange={handleChangeTextField}
        />
        <TextField
          type="email"
          label="Email"
          name="email"
          value={user.email}
          onChange={handleChangeTextField}
          rightChild={
            !data?.emailVerified && (
              <Link onClick={handleClickVerifyEmail}>Подтвердить</Link>
            )
          }
        />
        <TextField
          type="tel"
          label="Телефон"
          name="phone"
          value={user.phone}
          onChange={handleChangeTextField}
          rightChild={
            !data?.phoneVerified && (
              <Link onClick={handleClickVerifyPhone}>Подтвердить</Link>
            )
          }
        />
        <Block h="1rem" />
        <Grid gap="1rem" templateColumns="auto auto" justifyContent="center">
          <Button
            label="Сменить пароль"
            decoration="outline"
            onClick={handleClickChangePassword}
          />
          <Button
            w="8rem"
            label="Сохранить"
            textColor="surface"
            onClick={handleClickSave}
          />
        </Grid>
      </Grid>
    </Page>
  )
}
