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
  ['Event not found', 'Событие не найдено'],
  ['Service not found', 'Услуга не найдена'],
]

// REFRESH_TOKEN_EXPIRED

export const translate = (message: string) => {
  const trans = messages.find(([a]) => a === message)?.[1]
  return trans || message
}
