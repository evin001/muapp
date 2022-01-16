import * as yup from 'yup'
import moment from 'moment'

import { ScheduleEventType } from '~/generated/graphql'
import { TIME_FORMAT } from '~/components/TimeField'

export const schema = yup.object({
  date: yup.string().required('Пожалуйста, укажите дату'),
  intervalStart: yup
    .string()
    .required('Пожалуйста, укажите время начала')
    .matches(TIME_FORMAT, 'Пожалуйста, введите корректное время начала')
    .test('time', 'Время начала не может превышать время завершения', function (value) {
      return !!value && this.parent.intervalEnd > value
    }),
  intervalEnd: yup
    .string()
    .required('Пожалуйста, укажите время завершения')
    .matches(TIME_FORMAT, 'Пожалуйста, введите корректное время завершения')
    .test(
      'time',
      'Время завершения не может быть меньше времени начала',
      function (value) {
        return !!value && this.parent.intervalStart < value
      },
    ),
  color: yup.string().required('Пожалуйста, укажите цвет'),
  type: yup.string().required('Пожалуйста, укажите повторение'),
})

export const colorSaturation = 500

export const colorOptions = [
  { text: 'Оранжевый', value: 'amber' },
  { text: 'Зелёный', value: 'green' },
  { text: 'Фиолетовый', value: 'purple' },
  { text: 'Голубой', value: 'cyan' },
  { text: 'Розовый', value: 'pink' },
  { text: 'Индиго', value: 'indigo' },
  { text: 'Синий', value: 'blue' },
  { text: 'Красный', value: 'red' },
]

export const weekdayOfMonth = (date: Date) => {
  const labels = ['', 'перв.', 'втор.', 'трет.', 'четв.', 'послед.']

  const sourceDay = moment(date).date()
  const sourceWeek = Math.ceil(sourceDay / 7)

  const lastDay = moment(date).endOf('month').date()
  const lastWeek = Math.ceil(lastDay / 7)

  if (sourceWeek === lastWeek || sourceDay + 7 > lastDay) {
    return labels[labels.length - 1]
  }

  return labels[sourceWeek]
}

export const getRepetitionOptions = (date: Date) => {
  return [
    { text: 'Не повторять', value: ScheduleEventType.Once },
    { text: 'Ежедневно', value: ScheduleEventType.Daily },
    {
      text: `Еженедельно - ${moment(date).format('dddd')}`,
      value: ScheduleEventType.Weekly,
    },
    {
      text: `Ежемесячно ${weekdayOfMonth(date)} ${moment(date).format('dddd')}`,
      value: ScheduleEventType.Monthly,
    },
    {
      text: 'Каждый будний день (с понедельника по пятницу)',
      value: ScheduleEventType.Weekday,
    },
  ]
}
