import { useContext } from 'react'
import { AuthContext, AuthContextData } from '../contexts/AuthContext'

export const useAuth = () => useContext<AuthContextData>(AuthContext)
