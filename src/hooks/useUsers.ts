import { useContext } from 'react'
import { UserContext } from '../contexts/UsersContext'

export const useUsers = () => useContext(UserContext)
