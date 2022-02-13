import React from 'react'

import { Grid, TextField, Button, Link } from '@stage-ui/core'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { FORMAT_PHONE } from '~/utils/formats'

import { Page } from '~/components/Page'
import { HintError } from '~/components/HintError'
import { useTitle } from '~/hooks/useTitle'
import { useSelector } from '~/hooks/useSelector'
import { UserActions } from '~/data/user'
import { PhoneField } from '~/components/PhoneField'

type ProfileFields = {
  email: string
  phone: string
  firstName?: string
  lastName?: string
}

const schema = yup.object({
  email: yup.string().email().required(),
  phone: yup.string().matches(FORMAT_PHONE).required(),
  firstName: yup.string(),
  lastName: yup.string(),
})

export const Profile = () => {
  useTitle('Профиль')

  const { user, error, loading } = useSelector((state) => ({
    user: state.user.data,
    error: state.user.error,
    loading: state.user.fetch === 'pending',
  }))

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<ProfileFields>({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const handleClickChangePassword = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log('[handleClickChangePassword]: not implemented yet')
  }

  const handleClickVerifyEmail = () => {
    console.log('[handleClickVerifyEmail]: not implemented yet')
  }

  const handleClickVerifyPhone = () => {
    console.log('[handleClickVerifyPhone]: not implemented yet')
  }

  const handleForm = (form: ProfileFields) => {
    UserActions.profileUpdate(form)
  }

  return (
    <Page title="Профиль">
      <form onSubmit={handleSubmit(handleForm)}>
        <Grid gap="1rem">
          <Controller
            name="firstName"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                label="Имя"
                placeholder="Мария"
                value={value}
                onChange={(e) => {
                  onChange(e.target.value.trim())
                }}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                label="Фамилия"
                placeholder="Гамильтон"
                value={value}
                onChange={(e) => {
                  onChange(e.target.value.trim())
                }}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                type="email"
                label="Email"
                value={value}
                onChange={(e) => {
                  onChange(e.target.value.trim())
                }}
                rightChild={
                  !user?.emailVerified && (
                    <Link onClick={handleClickVerifyEmail}>Подтвердить</Link>
                  )
                }
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field: { value, onChange } }) => (
              <PhoneField
                label="Телефон"
                value={value}
                onChange={onChange}
                rightChild={
                  !user?.phoneVerified && (
                    <Link onClick={handleClickVerifyPhone}>Подтвердить</Link>
                  )
                }
              />
            )}
          />
          <HintError error={error || ''} ellipsis={false} />
          <Grid gap="1rem" templateColumns="auto auto" justifyContent="center">
            <Button
              label="Сменить пароль"
              decoration="outline"
              onClick={handleClickChangePassword}
              disabled={loading}
            />
            <Button
              w="8rem"
              label="Сохранить"
              textColor="surface"
              type="submit"
              disabled={!isValid || loading}
            />
          </Grid>
        </Grid>
      </form>
    </Page>
  )
}
