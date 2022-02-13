import React, { useState } from 'react'

import { Flexbox, Grid, TextField, Button, Text, Spinner } from '@stage-ui/core'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { ChangeSuccessPassword } from './ChangeSuccessPassword'

import { HintError } from '~/components/HintError'
import { PASSWORD_MIN_LEN } from '~/utils/formats'
import { UserActions } from '~/data/user'

type PasswordChangeModalProps = {
  onClose: () => void
}

type PasswordChangeFields = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

const schema = yup.object({
  oldPassword: yup.string().required('Пожалуйста, укажите старый пароль'),
  newPassword: yup
    .string()
    .required('Пожалуйста, укажите новый пароль')
    .min(PASSWORD_MIN_LEN, `Пароль не может быть короче ${PASSWORD_MIN_LEN} символов`),
  confirmPassword: yup
    .string()
    .required('Пожалуйста, повторите новый пароль')
    .test('matchPassword', 'Пароли не совпадают', function (value) {
      return !!value && this.parent.newPassword === value
    }),
})

export const PasswordChangeModal = ({ onClose }: PasswordChangeModalProps) => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<PasswordChangeFields>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const [success, setSuccess] = useState(false)
  const [errorResponse, setErrorResponse] = useState('')
  const [loading, setLoding] = useState(false)

  const handleForm = async (data: PasswordChangeFields) => {
    setLoding(true)
    setErrorResponse('')
    const res = await UserActions.passwordChange(data)
    if (res === true) {
      setSuccess(res)
    } else if (typeof res === 'string') {
      setErrorResponse(res)
    }
    setLoding(false)
  }

  if (success) {
    return <ChangeSuccessPassword onClose={onClose} />
  }

  return (
    <form onSubmit={handleSubmit(handleForm)} autoComplete="off">
      <Grid>
        <Controller
          name="oldPassword"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextField
              type="password"
              label="Старый пароль"
              value={value}
              onChange={(e) => {
                onChange(e.target.value)
              }}
              hint={<HintError error={error?.message} />}
            />
          )}
        />
        <Controller
          name="newPassword"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextField
              type="password"
              label="Новый пароль"
              value={value}
              autoComplete="off"
              onChange={(e) => {
                onChange(e.target.value)
              }}
              hint={<HintError error={error?.message} />}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextField
              type="password"
              label="Повторите пароль"
              value={value}
              autoComplete="off"
              onChange={(e) => {
                onChange(e.target.value)
              }}
              hint={<HintError error={error?.message} />}
            />
          )}
        />
        <HintError error={errorResponse} ellipsis={false} />
        <Flexbox justifyContent="flex-end">
          <Button
            label="Отменить"
            onClick={(e) => {
              e.preventDefault()
              onClose()
            }}
            decoration="plain"
          />
          <Flexbox w="1rem" />
          <Button
            w="7.25rem"
            type="submit"
            textColor="surface"
            disabled={!isValid}
            leftChild={loading && <Spinner />}
          >
            <Text>Изменить</Text>
          </Button>
        </Flexbox>
      </Grid>
    </form>
  )
}
