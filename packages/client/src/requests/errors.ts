export const messages = [
  [
    'A user with this email address or phone number already exists',
    'Пользователь с таким адресом электронной почты или номером телефона уже существует',
  ],
  ['Network request failed', 'Сетевой запрос не выполнен'],
  ['User not found', 'Пользователь не найден'],
  [
    'Wrong password please try again',
    'Неправильный пароль, пожалуйста, попробуйте еще раз',
  ],
  ['Refresh token does not exist', 'Сессия истекла, пожалуйста, авторизуйтесь заново'],
]

// REFRESH_TOKEN_EXPIRED

export const translate = (message: string) => {
  const trans = messages.find(([a]) => a === message)?.[1]
  return trans || message
}
