import React, { useState } from 'react'

import { Block, Flexbox, Menu, useTheme } from '@stage-ui/core'
import { Person, List, Calendar } from '@stage-ui/icons'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'

export type MasterContext = { active: string }
export type MasterOutletContext = (ctx: MasterContext) => void

const menuItems = [
  { Icon: List, link: 'services' },
  { Icon: Calendar, link: 'schedule' },
  { Icon: Person, link: 'profile' },
]

export const Master = () => {
  const { assets } = useTheme()
  const navigate = useNavigate()
  const [context, setContext] = useState<MasterContext>({ active: '' })

  return (
    <Flexbox h="100%" column>
      <Block w="100%" flex={1}>
        <Outlet context={setContext} />
      </Block>
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
            active={context.active === link}
          >
            <Icon size="xl" color={context.active === link ? 'primary' : 'light'} />
          </Menu.Item>
        ))}
      </Menu>
    </Flexbox>
  )
}

export function useMasterContext() {
  return useOutletContext<MasterOutletContext>()
}
