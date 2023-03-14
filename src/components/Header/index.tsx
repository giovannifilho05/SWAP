import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { Profile } from "./Profile";
import { OptionsNav } from "./OptionsNav";
import { SearchBox } from "./SearchBox";
import { Logo } from "./Logo";
import { useSideBarDrawer } from "../../contexts/SidebarDrawerContext";
import { RiMenuLine } from "react-icons/ri";

export function Header() {
  const { onOpen } = useSideBarDrawer()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          variant="unstyled"
          onClick={onOpen}
          fontSize="24"
          mr="2"
        />
      )}

      <Logo w="64"/>

      {isWideVersion && (
        <SearchBox />
      )}

      <Flex align="center" ml="auto">
        <OptionsNav />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  )
}