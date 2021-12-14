import React, { useEffect } from 'react'

import { useMasterContext, MasterLink } from '.'

import { useParams } from 'react-router-dom'

import { Profile } from './Profile'
import { Services } from './Services'
import { Schedule } from './Schedule'

export const MasterMainView = () => {
  const { setMenu } = useMasterContext()
  const { id } = useParams<{ id: MasterLink }>()

  useEffect(() => {
    setMenu(id || '')
  }, [id])

  return (
    <>
      {id === 'profile' && <Profile />}
      {id === 'services' && <Services />}
      {id === 'schedule' && <Schedule />}
    </>
  )
}
