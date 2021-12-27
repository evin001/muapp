import React, { useState } from 'react'

import { Flexbox, Menu, useTheme } from '@stage-ui/core'
import MenuItemTypes from '@stage-ui/core/control/Menu/MenuItem/types'
import { OverridesProp } from '@stage-ui/system/props/overrides'
import { Person, List, Calendar, LogOut } from '@stage-ui/icons'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'

import { UserActions } from '~/data/user'

export type MasterContext = { setMenu: MasterMenuContext }
export type MasterMenuContext = (ctx: MasterLink) => void
export type MasterLink =
  | typeof LINK_SERVICES
  | typeof LINK_SCHEDULE
  | typeof LINK_PROFILE
  | ''

export const LINK_SERVICES = 'services'
export const LINK_SCHEDULE = 'schedule'
export const LINK_PROFILE = 'profile'

const menuItems = [
  { Icon: List, link: LINK_SERVICES },
  { Icon: Calendar, link: LINK_SCHEDULE },
  { Icon: Person, link: LINK_PROFILE },
]

export const Master = () => {
  const { assets } = useTheme()
  const navigate = useNavigate()

  const [menu, setMenu] = useState<MasterLink>('')

  const menuOverrides: OverridesProp<MenuItemTypes.Classes> = {
    container: {
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
    },
  }

  return (
    <Flexbox h="100%" column>
      <Outlet context={{ setMenu }} />
      <Menu
        h="3.5rem"
        display="flex"
        decoration="marker-reverse"
        backgroundColor="onPrimary"
        css={{
          boxShadow: assets.shadow.s,
          justifyContent: 'space-around',
          flexShrink: 0,
          '& #focused': {
            boxShadow: 'none !important',
          },
        }}
        borderRadius="0.3125rem"
      >
        {menuItems.map(({ link, Icon }) => (
          <Menu.Item
            key={link}
            as="a"
            flex={1}
            href={`master/${link}`}
            overrides={menuOverrides}
            onClick={() => navigate(link)}
            active={menu === link}
          >
            <Icon size="xl" color={menu === link ? 'primary' : 'onBackground'} />
          </Menu.Item>
        ))}
        <Menu.Item
          flex={1}
          overrides={menuOverrides}
          onClick={() => UserActions.logOut()}
        >
          <LogOut size="xl" color="onBackground" />
        </Menu.Item>
      </Menu>
    </Flexbox>
  )
}

export function useMasterContext() {
  return useOutletContext<MasterContext>()
}
