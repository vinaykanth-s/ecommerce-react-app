import { createContext, useContext } from 'react'
import { auth } from './Auth'
import useProvideAuth from './useProvideAuth'

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
