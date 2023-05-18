import { useAuth } from '../../hooks/useAuth'
import { AddIcon } from '@chakra-ui/icons'
import {
  Menu,
  MenuButton,
  Button,
  Avatar,
  MenuList,
  MenuItem as MenuItemChakra,
  MenuDivider,
  Icon,
  Skeleton,
  MenuItemProps as MenuItemChakraProps,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { RiLogoutBoxLine } from 'react-icons/ri'

export function SettingsMenu() {
  const { user, isLoading, signOut } = useAuth()
  const router = useRouter()

  return (
    <Menu autoSelect={false}>
      <MenuButton
        as={Button}
        p={0}
        h="100%"
        borderRadius="50%"
        backgroundColor="transparent"
      >
        <Skeleton isLoaded={!isLoading}>
          <Avatar size="md" name={user?.displayName} src={user?.photoURL} />
        </Skeleton>
      </MenuButton>
      <MenuList>
        <MenuItem
          icon={<AddIcon fontSize="md" />}
          onClick={() => router.push('project/create')}
          title="Criar novo projeto"
        />

        <MenuDivider />

        <MenuItem
          icon={<Icon as={RiLogoutBoxLine} fontSize="md" />}
          onClick={async () => await signOut()}
          title="Sair"
        />
      </MenuList>
    </Menu>
  )
}

interface MenuItemProps extends MenuItemChakraProps {
  title: string
}

function MenuItem({ title, ...rest }: MenuItemProps) {
  return (
    <MenuItemChakra color="blackAlpha.800" fontSize="md" {...rest}>
      {title}
    </MenuItemChakra>
  )
}
