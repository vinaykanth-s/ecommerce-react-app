import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from './Auth'

function useProvideAuth() {
  const [user, setUser] = useState('')

  const signUp = (email, password, displayName) =>
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
      updateProfile(user, { displayName })
      setUser(user)
      return user
    })

  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      setUser(user)
      return user
    })

  const signOutUser = () => signOut(auth).then(() => setUser(null))

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(null)
    })

    return () => unsubscribe()
  })

  return {
    signIn,
    signUp,
    signOutUser,
    user,
  }
}

export default useProvideAuth
