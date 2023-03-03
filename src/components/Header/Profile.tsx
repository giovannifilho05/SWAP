import { Flex, Avatar, Box, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

interface ProfileProps {
  showProfileData?: boolean;
}

export const Profile: NextPage = ({ showProfileData = true }: ProfileProps) => {
  const { user } = useContext(AuthContext)

  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text >{user?.name}</Text>
          <Text fontSize="small" color="gray.300">{user?.email}</Text>
        </Box>
      )}

      <Avatar size="md" name={user?.name} src={user?.name} />
    </Flex>
  )
}