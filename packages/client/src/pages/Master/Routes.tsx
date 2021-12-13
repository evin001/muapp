import React, { useEffect } from 'react'

import { MASTER_PATH } from '.'

import { Route, useLocation, useNavigate, Navigate } from 'react-router-dom'

import { AUTH_PATH } from '../Auth'

import { ServicesPage } from './Services'

import useSelector from '~/hooks/useSelector'
import { Role } from '~/generated/graphql'

export const MasterRoutes = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const role = useSelector(({ user }) => user.data?.role)

  useEffect(() => {
    if (role === Role.Master && pathname.startsWith(AUTH_PATH)) {
      navigate(`${MASTER_PATH}/services`)
    }
  }, [pathname, role])

  return (
    <Route path={MASTER_PATH} element={<ServicesPage />}>
      <Route path="services" element={<ServicesPage />} />
      <Route path="" element={<Navigate to={MASTER_PATH} />} />
    </Route>
  )
}
