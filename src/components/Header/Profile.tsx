import { Flex, Box, Text } from "@chakra-ui/react"
import { useAuth } from "../../hooks/useAuth";
import { SettingsMenu } from "./SettingsMenu";

interface ProfileProps {
  showProfileData?: boolean;
  children?: React.ReactNode | undefined;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { user } = useAuth()

  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right" color="teal.900">
          <Text >{user?.displayName}</Text>
          <Text fontSize="small" color="teal.800">{user?.email}</Text>
        </Box>
      )}

      <SettingsMenu />

    </Flex>
  )
}