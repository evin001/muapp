import React, { useEffect, useState } from 'react'

import { useAuthContext } from '.'

import { useNavigate } from 'react-router-dom'
import { TextField, Button, Spinner } from '@stage-ui/core'

import { AuthError } from './AuthError'

import { useSelector } from '~/hooks/useSelector'
import { UserActions } from '~/data/user'
import { verify } from '~/utils/auth'
import { useTitle } from '~/hooks/useTitle'

export const Login = () => {
  useTitle('Вход')

  const navigate = useNavigate()
  const { fetchError, loading } = useSelector(({ user }) => ({
    fetchError: user.error,
    loading: user.fetch === 'pending',
  }))

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const setContext = useAuthContext()

  useEffect(() => {
    setContext({
      title: 'Вход',
      subtitle: 'Войдите, чтобы использовать все возможности системы',
    })
  }, [])

  const handleChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value)
    } else if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }

  const validate = () => {
    if (emailError) setEmailError('')
    if (passwordError) setPasswordError('')

    const emailVerified = verify(email, 'email')
    if (!emailVerified.ok) setEmailError(emailVerified.error)

    const passwordVerified = verify(password, 'password')
    if (!passwordVerified.ok) setPasswordError(passwordVerified.error)

    return true
  }

  const handleClickAuth = () => {
    if (validate()) {
      UserActions.auth(email, password)
    }
  }

  return (
    <>
      <TextField
        value={email}
        name="email"
        onChange={handleChangeTextField}
        placeholder="Электронная почта"
        decoration="underline"
        color="surface"
        type="email"
        css={{ borderBottomColor: 'white' }}
      />
      <TextField
        value={password}
        name="password"
        onChange={handleChangeTextField}
        placeholder="Пароль"
        decoration="underline"
        type="password"
        color="surface"
        css={{ borderBottomColor: 'white' }}
      />
      <Button
        w="100%"
        label="Вход"
        color="secondary"
        css={{ fontWeight: 600 }}
        textColor={(c) => c.palette.orange}
        onClick={handleClickAuth}
        disabled={!(email && password) || loading}
        leftChild={loading ? <Spinner /> : undefined}
      />
      <Button
        w="100%"
        label="Регистрация"
        color="secondary"
        css={{ fontWeight: 600 }}
        textColor={(c) => c.palette.orange}
        onClick={() => navigate('../register')}
      />
      <AuthError>{emailError || passwordError || fetchError}</AuthError>
    </>
  )
}
