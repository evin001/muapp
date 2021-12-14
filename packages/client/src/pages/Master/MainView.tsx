import React, { useEffect } from 'react'

import { useMasterContext } from '.'

import { useParams } from 'react-router-dom'

import { Profile } from './Profile'
import { Services } from './Services'
import { Schedule } from './Schedule'

export const MasterMainView = () => {
  const setContext = useMasterContext()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (id) setContext({ active: id })
  }, [id])

  return (
    <>
      {id === 'profile' && <Profile />}
      {id === 'services' && <Services />}
      {id === 'schedule' && <Schedule />}
    </>
  )
}
