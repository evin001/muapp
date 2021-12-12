import React, { useState } from 'react'

import AuthPage from '.'

import { useNavigate } from 'react-router-dom'
import { TextField, Button, Spinner } from '@stage-ui/core'

import AuthError from './AuthError'

import { verify } from '~/utils/auth'
import useSelector from '~/hooks/useSelector'

const Login = () => {
  const navigate = useNavigate()
  const { fetchError, loading } = useSelector(({ user }) => ({
    fetchError: user.error,
    loading: user.fetch === 'pending',
  }))

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

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
      // TODO Send auth request
    }
  }

  return (
    <AuthPage title="Вход" subtitle="Войдите, чтобы использовать все возможности системы">
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
        css={{ fontWeight: 600 }}
        textColor={(c) => c.palette.orange}
        onClick={handleClickAuth}
      />
      <Button
        w="100%"
        label="Регистрация"
        css={{ fontWeight: 600 }}
        textColor={(c) => c.palette.orange}
        onClick={() => navigate('/register')}
        disabled={!(email && password) || loading}
        leftChild={loading ? <Spinner /> : undefined}
      />
      <AuthError>{emailError || passwordError || fetchError}</AuthError>
    </AuthPage>
  )
}

export default Login
