import React, { useState } from 'react'

import { Flexbox, Menu, useTheme } from '@stage-ui/core'
import { Person, List, Calendar } from '@stage-ui/icons'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'

export type MasterContext = { setMenu: MasterMenuContext }
export type MasterMenuContext = (ctx: string) => void

const menuItems = [
  { Icon: List, link: 'services' },
  { Icon: Calendar, link: 'schedule' },
  { Icon: Person, link: 'profile' },
]

export const Master = () => {
  const { assets } = useTheme()
  const navigate = useNavigate()

  const [menu, setMenu] = useState('')

  return (
    <Flexbox h="100%" column>
      <Outlet context={{ setMenu }} />
      <Menu
        h="3.5rem"
        display="flex"
        decoration="marker-reverse"
        css={{
          boxShadow: assets.shadow.s,
          justifyContent: 'space-around',
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
            overrides={{
              container: {
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
              },
            }}
            onClick={() => navigate(link)}
            active={menu === link}
          >
            <Icon size="xl" color={menu === link ? 'primary' : 'light'} />
          </Menu.Item>
        ))}
      </Menu>
    </Flexbox>
  )
}

export function useMasterContext() {
  return useOutletContext<MasterContext>()
}
