import React from 'react'

import { Block, Flexbox, Menu, useTheme } from '@stage-ui/core'
import { Person, List, Calendar } from '@stage-ui/icons'
import { Outlet, useNavigate } from 'react-router-dom'

const menuItems = [
  { Icon: List, link: 'services' },
  { Icon: Calendar, link: 'schedule' },
  { Icon: Person, link: 'profile' },
]

export const Master = () => {
  const { assets } = useTheme()
  const navigate = useNavigate()

  return (
    <Flexbox h="100%" column>
      <Block w="100%" flex={1}>
        <Outlet />
      </Block>
      <Menu
        h="3.5rem"
        decoration="marker-reverse"
        css={{
          boxShadow: assets.shadow.s,
          display: 'flex',
          justifyContent: 'space-around',
        }}
        borderRadius="0.3125rem"
      >
        {menuItems.map(({ link, Icon }) => (
          <Menu.Item
            key={link}
            as="a"
            href={`master/${link}`}
            overrides={{
              container: {
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                textAlign: 'center',
              },
            }}
            onClick={() => navigate(link)}
          >
            <Icon size="xl" color="light" />
          </Menu.Item>
        ))}
      </Menu>
    </Flexbox>
  )
}
