import React, { useRef, useEffect } from 'react'

import { Text } from '@stage-ui/core'
import moment, { Duration } from 'moment'

type TimerProps = {
  seconds: number
  onExpired?: () => void
}

const INTERVAL = 500

export const Timer = ({ seconds, onExpired }: TimerProps) => {
  const timerId = useRef(0)
  const container = useRef<HTMLSpanElement>(null)
  const timer = useRef<Duration>(moment.duration(seconds, 'seconds'))

  const clearTimer = () => {
    if (timerId.current) {
      clearInterval(timerId.current)
      onExpired?.()
    }
  }

  const format = () => {
    const min = timer.current.minutes()
    const sec = timer.current.seconds()
    if (sec < 0) {
      clearTimer()
      return '00:00'
    }
    return `${(min < 10 && '0') || ''}${min}:${(sec < 10 && '0') || ''}${sec}`
  }

  const tick = () => {
    timer.current = moment.duration(
      timer.current.asMilliseconds() - INTERVAL,
      'milliseconds',
    )
    if (container.current) {
      container.current.innerHTML = format()
    }
  }

  useEffect(() => {
    timerId.current = window.setInterval(tick, INTERVAL)
    return clearTimer
  }, [])

  return (
    <Text w="2.375rem" ref={container} css={{ fontVariantNumeric: 'tabular-nums' }}>
      {format()}
    </Text>
  )
}
