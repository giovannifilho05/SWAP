import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react'

type UserID = string

export type User = {
  id: UserID
  name: string
  lastName: string
  email: string
  userType: string
}

type UsersContextData = {
  users: User[]
  setUsers: Dispatch<SetStateAction<User[]>>
  selectedUser: User
  setSelectedUser: (user: User | UserID) => void
}

type UsersProps = {
  children: ReactNode
}

export const UserContext = createContext({} as UsersContextData)

export function UsersProvider({ children }: UsersProps) {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUserState] = useState<User>()

  function setSelectedUser(param: User | UserID) {
    let user: User

    if (typeof param === 'object') {
      user = param
    } else {
      user = users.find((user) => user.id === param)
    }

    setSelectedUserState(user)
  }

  return (
    <UserContext.Provider
      value={{ users, setUsers, selectedUser, setSelectedUser }}
    >
      {children}
    </UserContext.Provider>
  )
}
