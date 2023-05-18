import {
  Button,
  Text,
  HStack,
  Avatar,
  Box,
  Spacer,
  Tag,
} from '@chakra-ui/react'
import { useRef } from 'react'
import { Modal } from './modal'
import { User } from '../../contexts/UsersContext'
import { useUsers } from '../../hooks/useUsers'
import { Roles } from '../../contexts/AuthContext'

interface UserCardProps {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  const modalRef = useRef(null)
  const { setSelectedUser } = useUsers()

  return (
    <Modal ref={modalRef}>
      <HStack
        as={Button}
        onClick={() => {
          setSelectedUser(user.id)
          modalRef.current?.onOpen()
        }}
        h="80px"
      >
        <Avatar name={`${user.name} ${user.lastName}`} />

        <Box mr="4" textAlign="left">
          <Text fontSize="md">{`${user.name} ${user.lastName}`}</Text>
          <Text fontSize="sm" fontWeight="normal" color="gray.400">
            {user.email}
          </Text>
        </Box>
        <Spacer />

        <Tag size="md" variant="solid" colorScheme="teal">
          {Roles[user.userType]}
        </Tag>
      </HStack>
    </Modal>
  )
}
