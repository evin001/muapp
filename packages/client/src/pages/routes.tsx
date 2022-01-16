import React from 'react'

import { RouteObject, Navigate } from 'react-router-dom'

import { AsyncLoader } from '~/components/AsyncLoader'

export const MainView = React.lazy(() => import('./MainView'))

export const Master = React.lazy(() => import('./Master'))
export const MasterServicesEdit = React.lazy(() => import('./Master/Services/Edit'))
export const MasterScheduleEdit = React.lazy(() => import('./Master/Schedule/Edit'))
export const MasterMainView = React.lazy(() => import('./Master/MainView'))

export const Auth = React.lazy(() => import('./Auth'))
export const Login = React.lazy(() => import('./Auth/Login'))
export const Register = React.lazy(() => import('./Auth/Register'))

export const mainRoutes: RouteObject[] = [
  {
    path: '/',
    element: <AsyncLoader component={MainView} />,
    children: [
      {
        path: 'master',
        element: <AsyncLoader component={Master} />,
        children: [
          {
            path: ':id',
            element: <AsyncLoader component={MasterMainView} />,
          },
          {
            path: 'services/edit',
            element: <AsyncLoader component={MasterServicesEdit} />,
          },
          {
            path: 'services/edit/:id',
            element: <AsyncLoader component={MasterServicesEdit} />,
          },
          {
            path: 'schedule/edit',
            element: <AsyncLoader component={MasterScheduleEdit} />,
          },
          {
            path: 'schedule/edit/:id',
            element: <AsyncLoader component={MasterScheduleEdit} />,
          },
          {
            path: '',
            element: <Navigate replace to="services" />,
          },
        ],
      },
      {
        path: 'auth',
        element: <AsyncLoader component={Auth} />,
        children: [
          {
            path: 'register',
            element: <AsyncLoader component={Register} />,
          },
          {
            path: 'login',
            element: <AsyncLoader component={Login} />,
          },
          {
            path: '',
            element: <Navigate replace to="login" />,
          },
        ],
      },
    ],
  },
]
