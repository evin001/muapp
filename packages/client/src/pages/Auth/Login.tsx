import React, { useState } from 'react'

import AuthPage from '.'

import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@stage-ui/core'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value)
    } else if (e.target.name === 'password') {
      setPassword(e.target.value)
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
      />
      <Button
        w="100%"
        label="Регистрация"
        css={{ fontWeight: 600 }}
        textColor={(c) => c.palette.orange}
        onClick={() => navigate('/register')}
      />
    </AuthPage>
  )
}

export default Login
