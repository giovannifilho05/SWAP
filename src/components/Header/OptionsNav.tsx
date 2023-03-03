import { HStack, Icon, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { RiNotificationLine, RiAddCircleFill, RiUserAddLine } from "react-icons/ri";

export function OptionsNav() {
  return (
    <HStack
      spacing={["2", "4"]}
      mx={["6", "8"]}
      pr={["6", "8"]}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <IconButton
        aria-label='Adicionar novo projeto'
        icon={<RiNotificationLine fontSize="25" />}
        colorScheme="gray"
        bg="transparent"
        _hover={{ bg: "transparent", color: 'white' }}
      />

      <Link href="/newProject">
        <IconButton
          aria-label='Adicionar novo projeto'
          icon={<RiAddCircleFill fontSize="25" />}
          size="sm"
          colorScheme="gray"
          bg="transparent"
          _hover={{ bg: "transparent", color: 'white' }}
        />
      </Link>
    </HStack>

  )
}