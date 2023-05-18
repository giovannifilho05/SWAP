import {
  Icon,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  Text,
} from '@chakra-ui/react'
import { ElementType } from 'react'
import { ActiveLink } from '../ActiveLink'

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType
  children: string
  href: string
  shouldMatchExatcHref?: boolean
}

export function NavLink({
  icon,
  href,
  shouldMatchExatcHref,
  children,
  ...rest
}: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref shouldMatchExatcHref>
      <ChakraLink display="flex" alignItems="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  )
}
